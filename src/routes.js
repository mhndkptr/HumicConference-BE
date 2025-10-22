import express from "express";
import authRoutes from "./domains/v1/auth/auth-routes.js";
import userRoutes from "./domains/v1/user/user-routes.js";
import conferenceScheduleRoutes from "./domains/v1/conference-schedule/conference-schedule-routes.js";
import scheduleRoutes from "./domains/v1/schedule/schedule-routes.js";
import roomRoutes from "./domains/v1/room/room-routes.js";
import trackRoutes from "./domains/v1/track/track-routes.js";
import trackSessionRoutes from "./domains/v1/track-session/track-session-routes.js";

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
  {
    path: "/conference-schedule",
    route: conferenceScheduleRoutes,
  },
  {
    path: "/schedule",
    route: scheduleRoutes,
  },
  {
    path: "/room",
    route: roomRoutes,
  },
  {
    path: "/track",
    route: trackRoutes,
  },
  {
    path: "/track-session",
    route: trackSessionRoutes,
  },
];

appsV1Routes.forEach(({ path, route }) => {
  router.use(`/api/v1${path}`, route);
});

export default router;
