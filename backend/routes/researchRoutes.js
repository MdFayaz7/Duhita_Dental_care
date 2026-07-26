import express from 'express';
import {
  getResearch,
  createResearch,
  updateResearch,
  deleteResearch,
} from '../controllers/researchController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload, saveFilesToGridFS } from '../middleware/upload.js';

const router = express.Router();

const researchFields = upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

router.get('/', getResearch);
router.post('/', protectAdmin, researchFields, saveFilesToGridFS, createResearch);
router.put('/:id', protectAdmin, researchFields, saveFilesToGridFS, updateResearch);
router.delete('/:id', protectAdmin, deleteResearch);

export default router;
