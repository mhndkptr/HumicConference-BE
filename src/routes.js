import express from "express";
import authRoutes from "./domains/v1/auth/auth-routes.js";
import userRoutes from "./domains/v1/user/user-routes.js";

const router = express.Router();

const appsV1Routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
];

appsV1Routes.forEach(({ path, route }) => {
  router.use(`/api/v1${path}`, route);
});

export default router;
