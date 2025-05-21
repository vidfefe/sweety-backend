import * as uuid from "uuid";
import * as path from "path";
import fs from "fs";
import cloudinary from "../cloudary";

class File {
  async save(file) {
    if (!file) return null;

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        })
        .end(file.data);
    });

    const [, ext] = file.mimetype.split("/");
    const fileName = uuid.v4() + "." + ext;
    const filePath = path.resolve("static", fileName);
    file.mv(filePath);
    return fileName;
  }
  delete(file) {
    if (file) {
      const filePath = path.resolve("static", file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }
}

export default new File();
