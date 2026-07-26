import express from 'express';
import {
  getHospitalGallery,
  addHospitalGallery,
  deleteHospitalGallery,
  getCampGallery,
  addCampGallery,
  deleteCampGallery,
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload, saveToGridFS } from '../middleware/upload.js';

const router = express.Router();

// Hospital Gallery
router.get('/hospital', getHospitalGallery);
router.post('/hospital', protectAdmin, upload.single('image'), saveToGridFS, addHospitalGallery);
router.delete('/hospital/:id', protectAdmin, deleteHospitalGallery);

// Camp Gallery
router.get('/camp', getCampGallery);
router.post('/camp', protectAdmin, upload.single('image'), saveToGridFS, addCampGallery);
router.delete('/camp/:id', protectAdmin, deleteCampGallery);

export default router;
