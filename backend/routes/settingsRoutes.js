import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protectAdmin, upload.single('logo'), updateSettings);

export default router;
