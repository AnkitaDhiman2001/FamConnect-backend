import { Router } from "express";
import { createUsers, loginUser, forgetPassword, resetPassword} from "../../controllers/users/users";

const userRouter = Router();

userRouter.post('/register', createUsers);  
userRouter.post('/login', loginUser);   
userRouter.post('/forget-password', forgetPassword);
userRouter.post('/reset-password', resetPassword);


export default userRouter;
