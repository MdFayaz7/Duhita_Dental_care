import express from 'express';
import {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', bookAppointment);
router.get('/', protectAdmin, getAppointments);
router.put('/:id', protectAdmin, updateAppointmentStatus);
router.delete('/:id', protectAdmin, deleteAppointment);

export default router;
