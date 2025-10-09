import Joi from "joi";
import { PrismaService } from "../../../common/services/prisma-service.js";
import { buildQueryOptions } from "../../../utils/buildQueryOptions.js";
import BaseError from "../../../base-classes/base-error.js";
import { hashPassword } from "../../../utils/passwordConfig.js";
import userQueryConfig from "./user-query-config.js";

class UserService {
  constructor() {
    this.prisma = new PrismaService();
  }

  async getAll(query) {
    const options = buildQueryOptions(userQueryConfig, query);

    const [data, count] = await Promise.all([
      this.prisma.user.findMany(options),
      this.prisma.user.count({
        where: options.where,
      }),
    ]);

    const currentPage = query?.pagination?.page ?? 1;
    const itemsPerPage = query?.pagination?.limit ?? 10;
    const totalPages = Math.ceil(count / itemsPerPage);

    return {
      data,
      meta:
        query?.pagination?.page && query?.pagination?.limit
          ? {
              totalItems: count,
              totalPages,
              currentPage,
              itemsPerPage,
            }
          : null,
    };
  }

  async getById(id) {
    const data = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!data) throw BaseError.notFound("User not found.");

    delete data.password;

    return data;
  }

  async create(value) {
    const emailExist = await this.prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });

    if (emailExist) {
      let validation = "";
      const stack = [];

      validation += "Email already taken.";

      stack.push({
        message: "Email already taken.",
        path: ["email"],
      });

      throw new Joi.ValidationError(validation, stack);
    }

    delete value.password_confirmation;
    value.password = await hashPassword(value.password);

    const data = await this.prisma.user.create({ data: value });
    delete data.password;

    return data;
  }

  async update(id, value) {
    const data = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!data) throw BaseError.notFound("User not found.");

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: value,
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async softDelete(id) {
    const data = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!data) throw BaseError.notFound("User not found.");

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    delete updatedUser.password;

    return updatedUser;
  }
}

export default new UserService();
