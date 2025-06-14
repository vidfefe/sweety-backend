import "dotenv/config";
import express from "express";
import sequelize from "./sequelize.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload());
app.use(cookieParser(process.env.SECRET_KEY));
app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log("Сервер запущен на порту", PORT));
  } catch (e) {
    console.error(e);
  }
};

start();
