import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import sequelizeDb from './db/database';
import userRouter from './routers/users/users';

dotenv.config();

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,          
}));

app.use('/api', userRouter); 

const PORT = Number(process.env.PORT || 5000);

const connectDB = async () => {
  try {
    await sequelizeDb.authenticate();
    console.log('Connection has been established successfully.');
    await sequelizeDb.sync({ force: false });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
