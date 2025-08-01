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
const database_1 = __importDefault(require("./db/database"));
const users_1 = __importDefault(require("./routers/users/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://movie-frontend-git-main-ankitas-projects-f5c00b6c.vercel.app',
    credentials: true,
}));
app.use('/api', users_1.default);
const PORT = Number(process.env.PORT || 5000);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log('Connection has been established successfully.');
        yield database_1.default.sync({ force: false });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app%20-%20Copy.js.map