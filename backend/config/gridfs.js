import mongoose from 'mongoose';
import { Readable } from 'stream';

let bucket;

/**
 * Called once after mongoose connects to initialize the GridFSBucket.
 */
export const initGridFS = () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });
  console.log('✅ GridFS bucket initialized');
};

/**
 * Upload a buffer to GridFS.
 * @param {Buffer} buffer  - File content
 * @param {string} filename - Original filename
 * @param {string} mimetype - MIME type (e.g. 'image/jpeg')
 * @returns {Promise<ObjectId>} - The GridFS file _id
 */
export const uploadToGridFS = (buffer, filename, mimetype) => {
  return new Promise((resolve, reject) => {
    if (!bucket) {
      return reject(new Error('GridFS bucket is not initialized yet.'));
    }
    const readable = Readable.from(buffer);
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: mimetype,
    });
    readable
      .pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => resolve(uploadStream.id));
  });
};

/**
 * Open a download stream for a GridFS file by its string ID.
 * @param {string} id
 * @returns {GridFSBucketReadStream}
 */
export const getGridFSStream = (id) => {
  if (!bucket) throw new Error('GridFS bucket is not initialized yet.');
  return bucket.openDownloadStream(new mongoose.Types.ObjectId(id));
};

/**
 * Get GridFS file metadata by its string ID.
 * Returns null if not found.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export const getGridFSFileInfo = async (id) => {
  if (!bucket) throw new Error('GridFS bucket is not initialized yet.');
  const files = await bucket
    .find({ _id: new mongoose.Types.ObjectId(id) })
    .toArray();
  return files[0] || null;
};

/**
 * Delete a GridFS file by its string ID (silently skips if not found).
 * @param {string} id
 */
export const deleteGridFSFile = async (id) => {
  if (!bucket || !id) return;
  try {
    await bucket.delete(new mongoose.Types.ObjectId(id));
  } catch {
    // File may already not exist; ignore
  }
};
