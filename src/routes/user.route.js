import { Router } from "express";
import { createUser, login } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.post("/login", login);

export default userRouter;
