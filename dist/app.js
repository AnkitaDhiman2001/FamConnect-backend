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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const ws_1 = require("ws");
const database_1 = __importDefault(require("./db/database"));
const users_1 = __importDefault(require("./routers/users/users"));
const message_1 = __importDefault(require("./models/message"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ server });
const PORT = Number(process.env.PORT || 5000);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://fam-connect-blush.vercel.app',
        'https://fam-connect-ankitas-projects-f5c00b6c.vercel.app',
    ],
    credentials: true,
}));
app.use('/api', users_1.default);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log('Connection has been established successfully.');
        yield database_1.default.sync({ force: false }); // 👈 Keep it false in production
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
const clients = new Map();
wss.on('connection', (ws) => {
    let userId = null;
    let roomId = null;
    ws.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const message = JSON.parse(data.toString());
            if (message.type === 'join') {
                userId = message.userId;
                roomId = message.roomId;
                clients.set(ws, { userId, roomId });
                return;
            }
            if (message.type === 'message') {
                const content = message.content;
                yield message_1.default.create({ user_id: userId, room_id: roomId, content });
                for (const [client, info] of clients.entries()) {
                    if (client.readyState === ws.OPEN && info.roomId === roomId) {
                        client.send(JSON.stringify({
                            type: 'message',
                            content,
                            userId,
                            roomId,
                            timestamp: new Date().toISOString(),
                        }));
                    }
                }
            }
        }
        catch (err) {
            console.error('WebSocket message error:', err);
        }
    }));
    ws.on('close', () => {
        clients.delete(ws);
    });
});
server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map