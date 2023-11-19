import express from "express";
import { deleteUser, getAllUsers, singup, updateUser } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', singup);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;