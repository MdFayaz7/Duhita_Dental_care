import express from 'express';
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload, saveToGridFS } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getDoctors);
router.post('/', protectAdmin, upload.single('image'), saveToGridFS, createDoctor);
router.put('/:id', protectAdmin, upload.single('image'), saveToGridFS, updateDoctor);
router.delete('/:id', protectAdmin, deleteDoctor);

export default router;
