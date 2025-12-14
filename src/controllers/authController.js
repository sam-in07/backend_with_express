import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from '../prisma.js';
import jwt from "jsonwebtoken";
export const userSignUp = async (req, res) => {
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
};


export const userSignIn = async (req, res) => {
  const userSignInSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });
  const { success, data, error } = userSignInSchema.safeParse(req.body);
  if (!success) {
    return res
      .status(400)
      .json({ message: "Validation failed", data: z.flattenError(error) });
  }
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.passwordHash
  );
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid email or password" });
  }
  const secretkey = process.env.JWT_SECRET;
  const accesstoken = jwt.sign(
    {
      sub: user.id,
    },
    secretkey,
    { expiresIn: "1h" }
  );

  res.json({
    status: "success",
    message: "Sign-in successful",
    data: {
      accessToken: accesstoken,
    },
  });
};

export const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.json({
    status: "success",
    message: "User fetched successfully",
    data: user,
  });
};