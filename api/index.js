import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
import connectDb from './config/connectDB.js';
import postsRouter from './routes/posts.route.js';
import authRouter from './routes/auth.route.js';
import corsOptions from './config/corsOption.js';
import { getUploadsDir } from './uploads/getUploadsDir.js';

const app = express();

const PORT = 5000;
dotenv.config();
connectDb();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(getUploadsDir()));
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App listens on PORT ${PORT}`);
  });
});
