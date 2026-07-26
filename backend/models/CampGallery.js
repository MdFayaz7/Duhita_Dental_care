import mongoose from 'mongoose';

const campGallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Dental Camp Moment', trim: true },
    description: { type: String, default: '', trim: true },
    imageUrl: { type: String, required: true },
    location: { type: String, default: 'Vijayawada' },
    date: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('CampGallery', campGallerySchema);
