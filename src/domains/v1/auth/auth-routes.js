import BaseRoutes from "../../../base-classes/base-routes.js";

class AuthRoutes extends BaseRoutes {
  routes() {
    this.router.post("/login", (req, res) => {
      res.send("Login route");
    });

    this.router.post("/register", (req, res) => {
      res.send("Register route");
    });

    this.router.post("/refresh-token", (req, res) => {
      res.send("Refresh token route");
    });

    this.router.get("/me", (req, res) => {
      res.send("User profile route");
    });
  }
}

export default new AuthRoutes().router;
