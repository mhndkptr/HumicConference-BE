import "dotenv/config";
import apicache from "apicache";
import compression from "compression";
import errorHandler from "./middlewares/error-handler-middleware.js";
import express from "express";
import helmet from "helmet";
import logger from "./utils/logger.js";
import { queryParser } from "express-query-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes.js";
import corsMiddleware from "./middlewares/cors-middleware.js";
import BaseError from "./base-classes/base-error.js";

class ExpressApplication {
  app;
  fileStorage;
  fileFilter;
  constructor(port) {
    this.app = express();
    this.port = port;

    //  __init__
    this.setupMiddlewares([
      ...(process.env.NODE_ENV === "development" ? [morgan("dev")] : []),
      helmet(),
      compression(),
      corsMiddleware,
      cookieParser(),
      express.json(),
      express.urlencoded({ extended: false }),
      queryParser({
        parseNull: true,
        parseBoolean: true,
        parseNumber: true,
      }),
      // apicache.middleware("5 minutes"),
    ]);
    this.setupRoute();
    // Error Handler
    this.app.use(errorHandler);
  }

  setupMiddlewares(middlewaresArr) {
    middlewaresArr.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  setupRoute() {
    this.app.use("/", routes);
    this.app.use((req) => {
      logger.error(`Route not found: ${req.method} ${req.originalUrl}`);
      throw BaseError.notFound("Route not found");
    });
  }

  start() {
    const server = this.app.listen(this.port, () => {
      logger.info(`Application running on port ${this.port}`);
    });

    return server;
  }
}

export default ExpressApplication;
