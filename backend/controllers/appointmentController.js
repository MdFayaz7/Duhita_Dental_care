import Appointment from '../models/Appointment.js';
import { validateBooking } from '../config/slots.js';

export const bookAppointment = async (req, res, next) => {
  try {
    const { patientType, patientId, name, contactNo, problem, doctorId, doctorName, appointmentDate, timeSlot } = req.body;

    if (!name || !contactNo || !appointmentDate || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    if (typeof name !== 'string' || typeof contactNo !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid name or contact number' });
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(contactNo.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid contact number' });
    }

    const check = validateBooking(appointmentDate, timeSlot);
    if (!check.ok) {
      return res.status(400).json({ success: false, message: check.message });
    }

    let finalPatientId = patientId;
    if (patientType === 'new' || !finalPatientId) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      finalPatientId = `DUH-${new Date().getFullYear()}-${randomSuffix}`;
    }

    const appointment = await Appointment.create({
      patientType: patientType || 'new',
      patientId: finalPatientId,
      name: name.trim().slice(0, 120),
      contactNo: contactNo.trim(),
      problem: typeof problem === 'string' ? problem.trim().slice(0, 500) : '',
      doctorId: doctorId || null,
      doctorName: doctorName || 'Dr. Nalluru Sasidhar',
      appointmentDate,
      timeSlot,
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const { date, status, search } = req.query;
    let query = {};

    if (date) {
      query.appointmentDate = date;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { contactNo: searchRegex },
        { patientId: searchRegex },
        { doctorName: searchRegex },
      ];
    }

    const appointments = await Appointment.find(query).sort({ appointmentDate: -1, timeSlot: 1, createdAt: -1 });
    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, appointmentDate, timeSlot, doctorName, problem, notes } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (appointmentDate) updateFields.appointmentDate = appointmentDate;
    if (timeSlot) updateFields.timeSlot = timeSlot;
    if (doctorName) updateFields.doctorName = doctorName;
    if (problem !== undefined) updateFields.problem = problem;
    if (notes !== undefined) updateFields.notes = notes;

    const appointment = await Appointment.findByIdAndUpdate(id, updateFields, { new: true });
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
