import { Rating as RatingMapping } from "./mapping.js";
import { Product as ProductMapping } from "./mapping.js";
import { User as UserMapping } from "./mapping.js";
import AppError from "../errors/AppError.js";

class Rating {
  async getOne(userId, productId) {
    if (!userId) {
      throw AppError.badRequest("Пользователь не авторизован");
    }

    const product = await ProductMapping.findByPk(productId);
    if (!product) {
      throw AppError.badRequest("Товар не найден в БД");
    }

    const userRating = await RatingMapping.findOne({
      where: { userId, productId },
    });

    return { userRating: userRating ? userRating.rate : null };
  }

  async create(userId, productId, rate) {
    const product = await ProductMapping.findByPk(productId);
    if (!product) {
      throw AppError.badRequest(`Товар не найден в БД${productId}`);
    }

    const user = await UserMapping.findByPk(userId);
    if (!user) {
      throw AppError.badRequest(`Пользователь не найден в БД ${userId}`);
    }

    const existingRating = await RatingMapping.findOne({
      where: { userId, productId },
    });

    if (existingRating) {
      existingRating.rate = rate;
      await existingRating.save();
    } else {
      await RatingMapping.create({ userId, productId, rate });
    }

    const totalRating = await RatingMapping.sum("rate", {
      where: { productId },
    });
    const votes = await RatingMapping.count({ where: { productId } });

    const averageRating = votes > 0 ? totalRating / votes : 0;

    product.rating = averageRating;
    await product.save();

    return { rating: rate, averageRating };
  }
}

export default new Rating();
