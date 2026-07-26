import multer from 'multer';
import { uploadToGridFS } from '../config/gridfs.js';

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg',
    'image/avif',
    'application/pdf',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type. Only JPEG, PNG, WEBP, AVIF, and PDF are allowed.'),
      false
    );
  }
};

// All files are held in memory (never touch the disk)
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter,
});

/**
 * Middleware: after multer puts a single file on req.file,
 * this uploads it to GridFS and sets req.file.gridfsId.
 */
export const saveToGridFS = async (req, res, next) => {
  if (!req.file) return next();
  try {
    const id = await uploadToGridFS(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );
    req.file.gridfsId = id.toString();
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Middleware: after multer puts multiple files on req.files (fields),
 * this uploads each to GridFS and sets file.gridfsId on every file object.
 */
export const saveFilesToGridFS = async (req, res, next) => {
  if (!req.files) return next();
  try {
    for (const fieldName of Object.keys(req.files)) {
      for (const file of req.files[fieldName]) {
        const id = await uploadToGridFS(file.buffer, file.originalname, file.mimetype);
        file.gridfsId = id.toString();
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};
