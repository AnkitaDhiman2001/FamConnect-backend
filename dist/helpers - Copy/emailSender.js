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
exports.sendResetPasswordEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD,
    },
});
const sendResetPasswordEmail = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Verification Email",
        text: "Please verify your email address",
        html: ` <div style="max-width: 600px; margin: auto; background-color: #fff; border: 2px solid #ff69b4; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

        <h1 style="text-align: center; color: #ff1493;">Dear user,</h1>

        <p style="font-size: 18px; color: #333; text-align: center;">
           Kindly verify your email address by clicking the button below. This is a one-time verification link that will expire in 24 hours.
        </p>

        <div style="text-align: center; margin-top: 20px;">
            <a href="${process.env.FRONTEND_URL}/auth/reset-password?email=${userEmail}" style="background-color: #ff69b4; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px;">
                Verify Email
            </a>
        </div>

        <p style="font-size: 16px; color: #666; text-align: center; margin-top: 30px;">
            With Regards,<br>
            <strong>TEAM UBIQUITOUS</strong>
        </p>

        </div>`,
    });
    console.log("Message sent:", info.messageId);
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=emailSender.js.map