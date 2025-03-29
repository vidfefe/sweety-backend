import RatingModel from "../models/Rating.js";
import AppError from "../errors/AppError.js";
import auth from "../middleware/authMiddleware.js";
import { User as UserMapping } from "../models/mapping.js";

class Rating {
  async getOne(req, res, next) {
    try {
      const { productId } = req.params;
      const userRating = await RatingModel.getOne(req.auth.id, productId);
      res.json(userRating);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const { productId, rate } = req.params;
      const rating = await RatingModel.create(req.auth.id, productId, rate);
      res.json(rating);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Rating();
