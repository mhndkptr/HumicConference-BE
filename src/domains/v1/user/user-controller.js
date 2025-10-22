import BaseError from "../../../base-classes/base-error.js";
import Role from "../../../common/enums/role-enum.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import UserService from "./user-service.js";

class UserController {
  async getAll(req, res) {
    const users = await UserService.getAll(req.validatedQuery);

    return successResponse(
      res,
      users.data,
      "Users data retrieved successfully",
      users.meta
    );
  }

  async getById(req, res) {
    const { id } = req.params;

    const data = await UserService.getById(id);

    return successResponse(res, data, "User data retrieved successfully");
  }

  async create(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const value = req.body;

    const data = await UserService.create(value);

    return createdResponse(res, data, "User created successfully");
  }

  async update(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const { id } = req.params;
    const value = req.body;

    if (req.user.id !== id && req.user.role !== Role.SUPER_ADMIN) {
      throw BaseError.forbidden("You are not allowed to update this user");
    }

    const data = await UserService.update(id, value);

    return successResponse(res, data, "User updated successfully");
  }

  async delete(req, res) {
    const { id } = req.params;

    const data = await UserService.softDelete(id);

    return successResponse(res, data, "User deleted successfully");
  }
}

export default new UserController();
