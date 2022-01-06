import express from "express";
import {userEdit, userDelete, userSee, userLogout} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/edit", userEdit);
userRouter.get("/delete", userDelete);
userRouter.get("/:id(\\d+)", userSee);
userRouter.get("/logout", userLogout)
// const 변수만 export 할 수 있다
export default userRouter;