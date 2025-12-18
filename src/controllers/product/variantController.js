import { prisma } from "../../database/prisma.js";
import { z } from "zod";


export const getAllVariant = async (req, res) =>{
  const variants =  await prisma.productVariant.findMany();

  res.json({
    status: 'success',
    message: 'All product variants fetched successfully',
    data: variants
  })
}
