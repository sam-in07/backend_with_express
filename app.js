const express = require("express");

const { z } = require("zod");
const app = express();
const bcrypt = require("bcryptjs");

app.use(express.json());

// const {flattenError} = z;

app.post("/auth/sign-up", async (req, res) => {
  const userCreateSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { success, data, error } = userCreateSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid data.",
      errors: error.flatten().fieldErrors
    });
  }

  // 🔐 Hash the password from validated data
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword
  };

  res.json({ user });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
