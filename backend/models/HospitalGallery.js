import mongoose from 'mongoose';

const hospitalGallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Hospital Premise', trim: true },
    description: { type: String, default: '', trim: true },
    imageUrl: { type: String, required: true },
    category: { type: String, default: 'Hospital' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('HospitalGallery', hospitalGallerySchema);
