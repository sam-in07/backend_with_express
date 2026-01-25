import { Router } from "express";
import { getAllImage, getImageById, createImage, updateImage ,deleteImage  } from '../../controllers/product/index.js';


const router = Router(); 

router.get('/', getAllImage);
router.post('/', createImage);
router.get('/:id', getImageById);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);

export default router;