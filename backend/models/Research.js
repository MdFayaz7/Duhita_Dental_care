import mongoose from 'mongoose';

const researchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    pdfUrl: { type: String, required: true },
    coverImageUrl: { type: String, default: '' },
    authors: { type: String, default: 'Dr. Nalluru Sasidhar & Research Team' },
    publishDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    category: { type: String, default: 'Clinical Study' },
    viewsCount: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Research', researchSchema);
