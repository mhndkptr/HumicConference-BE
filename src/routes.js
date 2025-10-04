import express from "express";
import authRoutes from "./domains/v1/auth/auth-routes.js";

const router = express.Router();

const appsV1Routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
];

appsV1Routes.forEach(({ path, route }) => {
  router.use(`/api/v1${path}`, route);
});

export default router;
