import { Stripe } from "stripe";
import AppError from "../errors/AppError.js";
import { Order } from "../models/mapping.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class Payment {
  async createSession(req, res, next) {
    try {
      const { products, name, email, phone, address } = req.body;

      if (!products || products.length === 0) {
        throw new Error("Корзина пуста");
      }

      const lineItems = products.map((product) => ({
        price_data: {
          currency: "byn",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.REACT_APP_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.REACT_APP_BASE_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
        customer_email: email,
        metadata: { name, phone, address },
      });

      res.json({ id: session.id });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
  async getPaymentStatus(req, res, next) {
    try {
      const { sessionId } = req.params;
      const { orderId } = req.query;
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const paymentStatus =
        session.payment_status === "paid" ? "paid" : "unpaid";

      await Order.update(
        { payment_status: paymentStatus },
        { where: { id: orderId } }
      );

      res.json({ status: paymentStatus });
    } catch (error) {
      next(AppError.badRequest(error.message));
    }
  }
}

export default new Payment();
