import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./database/prisma.js";
import { id } from "zod/locales";
import jwt from "jsonwebtoken";
// import { authMiddleware } from './middleware/authMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
const app = express();
app.use(express.json());




app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


//app.js => router => middleware => controller 