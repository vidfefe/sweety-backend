import { Order as OrderMapping } from "./mapping.js";
import { OrderItem as OrderItemMapping } from "./mapping.js";

class Order {
  async getAll(userId = null) {
    const options = {};
    if (userId) {
      options.where = { userId };
    }
    const orders = await OrderMapping.findAll(options);
    return orders;
  }

  async getOne(id, userId = null) {
    const options = {
      where: { id },
      include: [
        {
          model: OrderItemMapping,
          as: "items",
          attributes: ["id", "name", "price", "quantity"],
        },
      ],
    };
    if (userId) options.where.userId = userId;
    const order = await OrderMapping.findOne(options);
    if (!order) {
      throw new Error("Заказ не найден");
    }
    return order;
  }

  async create(data) {
    const items = data.items;
    const amount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const { name, email, phone, address, comment = null, userId = null } = data;
    const order = await OrderMapping.create({
      name,
      email,
      phone,
      address,
      comment,
      amount,
      userId,
      payment_status: "unpaid",
    });
    for (let item of items) {
      await OrderItemMapping.create({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        orderId: order.id,
      });
    }
    const created = await OrderMapping.findByPk(order.id, {
      include: [
        {
          model: OrderItemMapping,
          as: "items",
          attributes: ["name", "price", "quantity"],
        },
      ],
    });
    return created;
  }

  async delete(id) {
    let order = await OrderMapping.findByPk(id, {
      include: [
        { model: OrderItemMapping, attributes: ["name", "price", "quantity"] },
      ],
    });
    if (!order) {
      throw new Error("Заказ не найден");
    }
    await order.destroy();
    return order;
  }
}

export default new Order();
