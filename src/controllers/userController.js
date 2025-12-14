import { Router } from "express";
import { prisma } from '../prisma.js';
export const getAllUsers = async (req, res) => {
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
};


export const getUserById = async (req, res) => {
    const userId = req.params.id;

    const userGetSchema = z.object({
        id: z.uuid(),
    });

    const { success, error } = userGetSchema.safeParse({
        id: userId,
    });

    if (!success) {
        return res.status(400).json({ message: 'Validation failed', data: z.flattenError(error) });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        omit: {
            passwordHash: true
        }
    });

    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.json({ 
        status: 'success', 
        message: 'User fetched successfully', 
        data: { user } 
    });
}



export const updateUser  = async (req, res) => {
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
};



export const deleteUser = async (req, res) => {
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
} ;
