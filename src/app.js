import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./prisma.js";
import { id } from "zod/locales";
import jwt from "jsonwebtoken";

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

app.post("/auth/sign-in", async (req, res) => {
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
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    //joto gula numbner oto gula asbe
    //This specifies the maximum number of records to retrieve from the database. In this case, it limits the results to 10 users.

    skip: 0,
    //This specifies the number of records to skip
  });
  // res.json({ users , message: 'User fetched successfully' });
  res.json({
    status: "success",
    message: "User fetched successfully",
    data: users,
  });
});

app.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userUpdateSchema = z.object({
    // firstName: z.string().min(3),
    // lastName: z.string().min(3),
    id: z.uuid(),
    firstName: z.string(),
    lastName: z.string(),
    //cmtsless gula partial update
  });
  const { success, data, error } = userUpdateSchema.safeParse({
    id: userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  if (!success) {
    return res
      .status(400)
      .json({ message: "Validation failed", data: z.flattenError(error) });
  }

  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
  };

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: user,
    //pass ke shorie dibo dekhabo na
    omit: {
      passwordHash: true,
    },
  });

  res.json({
    status: "success",
    message: "User updated successfully",
    data: updatedUser,
  });
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  const userDeleteSchema = z.object({
    id: z.uuid(),
  });

  const { success, data, error } = userDeleteSchema.safeParse({
    id: userId,
  });

  if (!success) {
    return res
      .status(400)
      .json({ message: "Validation failed", data: z.flattenError(error) });
  }
  // user ta bairna korle bair bar khube
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  // na thakle error dibe
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
    select: {
      passwordHash: false,
      id: true,
      // Add other fields you want to select here
    },
  });

  res.json({
    status: "success",
    message: "User deleted successfully",
    data: { user: deletedUser },
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
