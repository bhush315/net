import { Router } from "express";
import {
  register,
  login,
  dashboard,
  getLoggedUser,
  logout,
} from "../controllers/authFunction.js";
import restrictAccess from "../middlewares/userAuthy.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/dashboard", restrictAccess, dashboard);
authRouter.get("/getLoggedUser", restrictAccess, getLoggedUser);
authRouter.post("/logout", restrictAccess, logout);

export default authRouter;
