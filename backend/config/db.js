import mongoose from 'mongoose';
import { initGridFS } from './gridfs.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/duhita_dental');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    initGridFS();
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Do not exit process so app can run in fallback/mock mode if MongoDB is not active locally
  }
};
