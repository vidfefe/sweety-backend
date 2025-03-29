import express from "express";
import PaymentController from "../controllers/Payment.js";

const router = express.Router();

router.post("/create-session", PaymentController.createSession);

router.get("/status/:sessionId", PaymentController.getPaymentStatus);

export default router;
