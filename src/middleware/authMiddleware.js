import { prisma } from '../prisma.js';
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  const accessToken = authHeader.split(" ")[1];
  //array 2 part a...token oijnno .. [0] te braerer [1] te token
  const secretkey = process.env.JWT_SECRET;
  jwt.verify(accessToken, secretkey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }
    //const userId = decoded.userId;  // assuming your JWT payload has { userId }
    const userId = decoded.sub;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit: { passwordHash: true } /*password ta dekhabo na*/,
    });

    // res.json({
    //   status: "success",
    //   message: "User fetched successfully",
    //   data: user,
    // });
    if (!user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    //user pass korbo
    req.user = user;
    next();
  });
};
