import express from 'express';
import { serveFile } from '../controllers/fileController.js';

const router = express.Router();

// GET /api/files/:id  — serve any uploaded file (image or PDF) from GridFS
router.get('/:id', serveFile);

export default router;
