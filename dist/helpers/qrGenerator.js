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
exports.generateAndStoreQrCode = generateAndStoreQrCode;
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generateAndStoreQrCode(userData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataToEncode = JSON.stringify(userData);
        try {
            const qrCodeDataUrl = yield qrcode_1.default.toDataURL(dataToEncode);
            const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, 'base64');
            const filePath = path_1.default.join('./upload', `qr_user_${userId}.png`);
            fs_1.default.writeFileSync(filePath, imageBuffer);
            console.log(`QR code for user ${userId} saved to: ${filePath}`);
            return filePath;
        }
        catch (err) {
            console.error('Error generating or storing QR code:', err);
            throw err;
        }
    });
}
//# sourceMappingURL=qrGenerator.js.map