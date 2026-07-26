import Schedule from '../models/Schedule.js';
import Appointment from '../models/Appointment.js';

export const getSchedule = async (req, res, next) => {
  try {
    const { date } = req.query;
    const query = date ? { date } : {};
    const items = await Schedule.find(query).sort({ priorityOrder: 1, createdAt: 1 });
    res.json({ success: true, count: items.length, schedule: items });
  } catch (error) {
    next(error);
  }
};

export const addSchedule = async (req, res, next) => {
  try {
    const { appointmentId, patientName, patientId, contactNo, doctorName, date, timeInterval, notes, status } = req.body;

    if (!patientName || !date || !timeInterval) {
      return res.status(400).json({ success: false, message: 'Patient name, date, and time interval are required' });
    }

    const count = await Schedule.countDocuments({ date });

    const item = await Schedule.create({
      appointmentId: appointmentId || null,
      patientName,
      patientId: patientId || '',
      contactNo: contactNo || '',
      doctorName: doctorName || 'Dr. Nalluru Sasidhar',
      date,
      timeInterval,
      priorityOrder: count + 1,
      notes: notes || '',
      status: status || 'Scheduled',
    });

    res.status(201).json({ success: true, schedule: item });
  } catch (error) {
    next(error);
  }
};

export const copyAppointmentsToSchedule = async (req, res, next) => {
  try {
    const { date } = req.body;
    if (!date) {
      return res.status(400).json({ success: false, message: 'Date is required' });
    }

    const appointments = await Appointment.find({ appointmentDate: date });
    if (appointments.length === 0) {
      return res.json({ success: true, message: 'No appointments found for this date', addedCount: 0 });
    }

    const existingSchedule = await Schedule.find({ date });
    const existingApptIds = new Set(existingSchedule.map((s) => s.appointmentId?.toString()).filter(Boolean));

    let addedCount = 0;
    let priorityCounter = existingSchedule.length;

    for (const apt of appointments) {
      if (!existingApptIds.has(apt._id.toString())) {
        priorityCounter++;
        await Schedule.create({
          appointmentId: apt._id,
          patientName: apt.name,
          patientId: apt.patientId || '',
          contactNo: apt.contactNo,
          doctorName: apt.doctorName || 'Dr. Nalluru Sasidhar',
          date: apt.appointmentDate,
          timeInterval: apt.timeSlot === 'Morning' ? '09:00 AM - 10:00 AM' : apt.timeSlot === 'Afternoon' ? '01:00 PM - 02:00 PM' : '05:00 PM - 06:00 PM',
          priorityOrder: priorityCounter,
          status: 'Scheduled',
          notes: apt.problem || '',
        });
        addedCount++;
      }
    }

    const updatedSchedule = await Schedule.find({ date }).sort({ priorityOrder: 1 });
    res.json({ success: true, message: `Copied ${addedCount} appointments to schedule`, addedCount, schedule: updatedSchedule });
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Schedule.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Schedule entry not found' });
    }
    res.json({ success: true, schedule: item });
  } catch (error) {
    next(error);
  }
};

export const reorderSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { direction } = req.body; // 'up' | 'down'

    const currentItem = await Schedule.findById(id);
    if (!currentItem) {
      return res.status(404).json({ success: false, message: 'Schedule item not found' });
    }

    const allItems = await Schedule.find({ date: currentItem.date }).sort({ priorityOrder: 1 });
    const currentIndex = allItems.findIndex((item) => item._id.toString() === id);

    if (direction === 'up' && currentIndex > 0) {
      const neighbor = allItems[currentIndex - 1];
      const tempOrder = currentItem.priorityOrder;
      currentItem.priorityOrder = neighbor.priorityOrder;
      neighbor.priorityOrder = tempOrder;
      await currentItem.save();
      await neighbor.save();
    } else if (direction === 'down' && currentIndex < allItems.length - 1) {
      const neighbor = allItems[currentIndex + 1];
      const tempOrder = currentItem.priorityOrder;
      currentItem.priorityOrder = neighbor.priorityOrder;
      neighbor.priorityOrder = tempOrder;
      await currentItem.save();
      await neighbor.save();
    }

    const updatedList = await Schedule.find({ date: currentItem.date }).sort({ priorityOrder: 1 });
    res.json({ success: true, schedule: updatedList });
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    const item = await Schedule.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Schedule entry not found' });
    }
    res.json({ success: true, message: 'Schedule entry deleted' });
  } catch (error) {
    next(error);
  }
};
