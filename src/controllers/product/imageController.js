import { prisma } from '../../database/prisma.js'
import { z } from 'zod'

export const getAllImage = async (req, res) =>{

  const images = await prisma.productImage.findMany();

  res.json({
    status: 'success',
    message: 'All product images fetched successfully',
    data: images
  })

}

export const getImageById = async (req, res) => {
  const imageId = req.params.id;

  const imageSchema = z.object({
    id: z.uuid()
  })

  const { success, data, error } = imageSchema.safeParse({ id: imageId });

  if (!success){
    return res.status(400).json({
      status: 'error',
      message: 'Bad request: Invalid UUID format',
    })
  }

  const image = await prisma.productImage.findUnique({
    where: { id: imageId }
  })

  if (!image) {
    return res.status(404).json({
      status: 'error',
      message: 'Image not found',
    })
  }

  res.json({
    status: 'success',
    message: 'Product image fetched successfully',
    data: image
  })

}

export const createImage = async (req, res) => {
  const { productId, imageUrl, altText, displayOrder, isPrimary } = req.body;

  const createSchema = z.object({
    productId: z.uuid(),
    imageUrl: z.url(),
    altText: z.string().max(255).optional(),
    displayOrder: z.number().int().nonnegative().optional(),
    isPrimary: z.boolean().optional()
  })

  const { success, data, error } = createSchema.safeParse({ productId, imageUrl, altText, displayOrder, isPrimary });

  if (!success){
    return res.status(400).json({
      status: 'error',
      message: 'Bad request payload must have valid productId and imageUrl',
    })
  }

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: data.productId }
  })

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found for the given productId',
    })
  }

  const newImage = await prisma.productImage.create({
    data: {
      productId: data.productId,
      imageUrl: data.imageUrl,
      altText: data.altText,
      displayOrder: data.displayOrder ?? 0,
      isPrimary: data.isPrimary ?? false
    }
  })

  res.status(201).json({
    status: 'success',
    message: 'Product image created successfully',
    data: newImage
  })

}

//assignemtn 
export const deleteImage = async (req, res) => {
  // res.json({ message: 'This is  please do it yourself' });
  const imageId = req.params.id;

  // Validate UUID
  const idSchema = z.object({
    id: z.string().uuid()
  });
  const idValidation = idSchema.safeParse({ id: imageId });

  if (!idValidation.success) {
    return res.status(400).json({
      status: 'error',
      message: 'Bad request: Invalid UUID format',
    });
  }

  // Check if image exists
  const existingImage = await prisma.productImage.findUnique({
    where: { id: imageId }
  });

  if (!existingImage) {
    return res.status(404).json({
      status: 'error',
      message: 'Image not found',
    });
  }

  // Delete image
  await prisma.productImage.delete({
    where: { id: imageId }
  });

  res.json({
    status: 'success',
    message: 'Product image deleted successfully',
  });

}




export const updateImage = async (req, res) => {
 // res.json({ message: 'This is  please do it yourself' });
   const imageId = req.params.id;

  // Validate UUID
  const idSchema = z.object({
    id: z.string().uuid()
  });
  const idValidation = idSchema.safeParse({ id: imageId });

  if (!idValidation.success) {
    return res.status(400).json({
      status: 'error',
      message: 'Bad request: Invalid UUID format',
    });
  }

  // Validate body
  const updateSchema = z.object({
    imageUrl: z.string().url().optional(),
    altText: z.string().max(255).optional(),
    displayOrder: z.number().int().nonnegative().optional(),
    isPrimary: z.boolean().optional()
  });

  const { success, data, error } = updateSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      status: 'error',
      message: 'Bad request: ' + error.errors.map(e => e.message).join(', '),
    });
  }

  // Check if image exists
  const existingImage = await prisma.productImage.findUnique({
    where: { id: imageId }
  });

  if (!existingImage) {
    return res.status(404).json({
      status: 'error',
      message: 'Image not found',
    });
  }

  // Update image
  const updatedImage = await prisma.productImage.update({
    where: { id: imageId },
    data: {
      ...data
    }
  });

  res.json({
    status: 'success',
    message: 'Product image updated successfully',
    data: updatedImage
  });
}