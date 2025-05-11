import express from 'express';
import cloudinaryController from '../../controllers/cloudinary/cloudinaryController.js';

const router = express.Router();

router.get('/config', cloudinaryController.getCloudinaryConfig);

export default router;