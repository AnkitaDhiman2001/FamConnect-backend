"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../controllers/users/users");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', users_1.createUsers);
userRouter.post('/login', users_1.loginUser);
userRouter.post('/forget-password', users_1.forgetPassword);
userRouter.post('/reset-password', users_1.resetPassword);
exports.default = userRouter;
//# sourceMappingURL=users.js.map