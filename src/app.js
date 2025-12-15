import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./prisma.js";
import { id } from "zod/locales";
import jwt from "jsonwebtoken";
import { authMiddleware } from './middleware/authMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
app.use(express.json());







app.use('/auth', authRoutes);
app.use('/users', userRoutes);





app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


//app.js => router => middleware => controller 