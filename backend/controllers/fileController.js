import mongoose from 'mongoose';
import { getGridFSStream, getGridFSFileInfo } from '../config/gridfs.js';

/**
 * GET /api/files/:id
 * Streams a file from GridFS to the HTTP response.
 * Adds a long-lived cache header so browsers don't re-fetch images repeatedly.
 */
export const serveFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid file ID' });
    }

    const fileInfo = await getGridFSFileInfo(id);
    if (!fileInfo) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    res.set('Content-Type', fileInfo.contentType || 'application/octet-stream');
    res.set('Content-Length', fileInfo.length);
    // Cache for 1 year in browsers/CDNs — safe because each upload gets a unique ID
    res.set('Cache-Control', 'public, max-age=31536000, immutable');

    const downloadStream = getGridFSStream(id);
    downloadStream.on('error', () => {
      if (!res.headersSent) {
        res.status(404).json({ success: false, message: 'File stream error' });
      }
    });
    downloadStream.pipe(res);
  } catch (err) {
    next(err);
  }
};
