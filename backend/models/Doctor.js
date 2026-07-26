import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    specialization: { type: String, default: 'General Dentistry' },
    experienceYears: { type: Number, default: 10 },
    highlights: [{ type: String }],
    image: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
