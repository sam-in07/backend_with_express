import { prisma } from '../../database/prisma.js'
import { z } from 'zod'

export const getAllImage = async (req, res) =>{

  const images = await prisma.productImage.findMany();

  res.json({
    status: 'success',
    message: 'All product images fetched successfully',
    data: images
  });

}