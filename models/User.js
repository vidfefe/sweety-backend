import { User as UserMapping } from "./mapping.js";

class User {
  async getAll() {
    const users = await UserMapping.findAll();
    return users;
  }

  async getOne(id) {
    const user = await UserMapping.findByPk(id);
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    return user;
  }

  async getByEmail(email) {
    const user = await UserMapping.findOne({ where: { email } });
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    return user;
  }

  async create(data) {
    const { email, password, role } = data;
    const check = await UserMapping.findOne({ where: { email } });
    if (check) {
      throw new Error("Пользователь уже существует");
    }
    const user = await UserMapping.create({ email, password, role });
    return user;
  }

  async update(id, data) {
    const user = await UserMapping.findByPk(id);
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    const {
      email = user.email,
      password = user.password,
      role = user.role,
    } = data;
    await user.update({ email, password, role });
    return user;
  }

  async delete(id) {
    const user = await UserMapping.findByPk(id);
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    await user.destroy();
    return user;
  }
}

export default new User();
