import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./prisma.js";

const app = express();
app.use(express.json());

app.post("/auth/sign-up", async (req, res) => {
  const userCreateSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const parsed = userCreateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid data.",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { firstName, lastName, email, password } = parsed.data;

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    // Create user in Prisma
    const createdUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
      },
    });

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = createdUser;
    res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    console.error(err);

    if (err.code === "P2002") {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
