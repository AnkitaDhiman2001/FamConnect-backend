import { Request, Response } from "express";
import Users from "../../models/users";
import bcrypt from "bcrypt";
import { sendResetPasswordEmail } from "../../helpers/emailSender";
import { generateAndStoreQrCode } from "../../helpers/qrGenerator";

export const createUsers = async (req: Request, res: Response) => {
    try {
        const users: any = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        const qrCodePath = await generateAndStoreQrCode(users, users.id);
        res.status(201).json({data: users, status: "success", message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to create user", error: err });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const getUser = await Users.findOne({ where: { email } });
        if (!getUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, getUser.dataValues.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "Login successful",
            data: {
                id: getUser.dataValues.id,
                name: getUser.dataValues.name,
                email: getUser.dataValues.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err });
    }
};

export const forgetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        sendResetPasswordEmail(email); 
        
        res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (err) {
        res.status(500).json({ message: "Error in forget password", error: err });
    }
}
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, newPassword } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        await Users.update({ password: hashedPassword }, { where: { email } });
        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error in reset password", error: err });
    }
};

