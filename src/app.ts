import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import sequelizeDb from './db/database';
import userRouter from './routers/users/users';
import Message from './models/message';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server }); 

const PORT = Number(process.env.PORT || 5000);

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://fam-connect-blush.vercel.app',
      'https://fam-connect-ankitas-projects-f5c00b6c.vercel.app',
    ],
    credentials: true,
  })
);

app.use('/api', userRouter);

const connectDB = async () => {
  try {
    await sequelizeDb.authenticate();
    console.log('Connection has been established successfully.');
    await sequelizeDb.sync({ force: false }); // 👈 Keep it false in production
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const clients = new Map();

wss.on('connection', (ws: any) => {
  let userId: string | null = null;
  let roomId: string | null = null;

  ws.on('message', async (data: any) => {
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

        await Message.create({ user_id: userId, room_id: roomId, content });

        for (const [client, info] of clients.entries()) {
          if (client.readyState === ws.OPEN && info.roomId === roomId) {
            client.send(
              JSON.stringify({
                type: 'message',
                content,
                userId,
                roomId,
                timestamp: new Date().toISOString(),
              })
            );
          }
        }
      }
    } catch (err) {
      console.error('WebSocket message error:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
