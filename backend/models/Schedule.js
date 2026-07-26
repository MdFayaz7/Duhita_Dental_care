import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    patientName: { type: String, required: true, trim: true },
    patientId: { type: String, default: '' },
    contactNo: { type: String, default: '' },
    doctorName: { type: String, default: 'Dr. Nalluru Sasidhar' },
    date: { type: String, required: true }, // YYYY-MM-DD
    timeInterval: { type: String, required: true, default: '09:00 AM - 09:30 AM' }, // Custom time slot interval
    priorityOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'], default: 'Scheduled' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Schedule', scheduleSchema);
