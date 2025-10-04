import { createSoftDeleteMiddleware } from "prisma-soft-delete-middleware";
import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async onModuleInit() {
    this.$use(
      createSoftDeleteMiddleware({
        models: {
          User: true,
        },
        defaultConfig: {
          field: "deleted_at",
          createValue: (deleted) => {
            if (deleted) return new Date();
            return null;
          },
        },
      })
    );

    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
