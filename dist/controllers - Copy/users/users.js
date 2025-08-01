"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.loginUser = exports.createUsers = void 0;
const users_1 = __importDefault(require("../../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailSender_1 = require("../../helpers/emailSender");
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.create({
            email: req.body.email,
            password: bcrypt_1.default.hashSync(req.body.password, 10)
        });
        res.status(201).json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create user", error: err });
    }
});
exports.createUsers = createUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getUser = yield users_1.default.findOne({ where: { email } });
        if (!getUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, getUser.dataValues.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({
            message: "Login successful",
            user: {
                id: getUser.dataValues.id,
                email: getUser.dataValues.email
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Login error", error: err });
    }
});
exports.loginUser = loginUser;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield users_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        (0, emailSender_1.sendResetPasswordEmail)(email);
        res.status(200).json({ message: "Password reset link sent to your email" });
    }
    catch (err) {
        res.status(500).json({ message: "Error in forget password", error: err });
    }
});
exports.forgetPassword = forgetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword } = req.body;
        const user = yield users_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = bcrypt_1.default.hashSync(newPassword, 10);
        yield users_1.default.update({ password: hashedPassword }, { where: { email } });
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Error in reset password", error: err });
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=users.js.map