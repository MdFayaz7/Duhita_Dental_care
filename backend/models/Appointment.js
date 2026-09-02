import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientType: { type: String, enum: ['new', 'existing'], default: 'new', required: true },
    patientId: { type: String, trim: true, default: '' },
    name: { type: String, required: true, trim: true },
    contactNo: { type: String, required: true, trim: true },
    problem: { type: String, default: '', trim: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    doctorName: { type: String, default: 'Dr. Nalluru Sasidhar' },
    appointmentDate: { type: String, required: true }, // Format YYYY-MM-DD
    timeSlot: { type: String, enum: ['Morning', 'Evening', 'Afternoon'], required: true },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
