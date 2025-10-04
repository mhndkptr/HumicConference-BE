import ExpressApplication from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.APP_PORT || 3000;

const appInstance = new ExpressApplication(PORT);
const app = appInstance.app;

if (process.env.NODE_ENV !== "cli") {
  const server = appInstance.start();

  process.on("SIGTERM", () => {
    logger.warn("SIGTERM RECEIVED!");
    server.close(() => {
      logger.warn("Process Terminated!");
    });
  });
}

export default app;
