import express from "express";
import RatingController from "../controllers/Rating.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = new express.Router();

router.get(
  "/product/:productId([0-9]+)",
  authMiddleware,
  RatingController.getOne
);
router.post(
  "/product/:productId([0-9]+)/rate/:rate([1-5])",
  authMiddleware,
  RatingController.create
);

export default router;
