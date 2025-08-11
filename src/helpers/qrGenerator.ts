import qrcode from "qrcode";
import fs from 'fs';
import path from 'path';

export async function generateAndStoreQrCode(userData: any, userId: string) {
    const dataToEncode = JSON.stringify(userData);

try {
    const qrCodeDataUrl = await qrcode.toDataURL(dataToEncode);

    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const filePath = path.join('./upload', `qr_user_${userId}.png`);

    fs.writeFileSync(filePath, imageBuffer);
    console.log(`QR code for user ${userId} saved to: ${filePath}`);

    return filePath; 
} catch (err) {
    console.error('Error generating or storing QR code:', err);
    throw err;
}
}