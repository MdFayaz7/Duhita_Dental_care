import express from 'express';
import {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protectAdmin } from '../middleware/auth.js';
import { availableSlots, istNow, isValidDateString } from '../config/slots.js';

const router = express.Router();

router.post('/', bookAppointment);
router.get('/slots', (req, res) => {
  const now = istNow();
  const date = isValidDateString(req.query.date) ? req.query.date : now.date;
  res.json({ success: true, today: now.date, date, slots: availableSlots(date) });
});

router.get('/', protectAdmin, getAppointments);
router.put('/:id', protectAdmin, updateAppointmentStatus);
router.delete('/:id', protectAdmin, deleteAppointment);

export default router;
