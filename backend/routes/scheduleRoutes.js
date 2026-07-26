import express from 'express';
import {
  getSchedule,
  addSchedule,
  copyAppointmentsToSchedule,
  updateSchedule,
  reorderSchedule,
  deleteSchedule,
} from '../controllers/scheduleController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protectAdmin, getSchedule);
router.post('/', protectAdmin, addSchedule);
router.post('/copy-appointments', protectAdmin, copyAppointmentsToSchedule);
router.put('/:id', protectAdmin, updateSchedule);
router.put('/:id/reorder', protectAdmin, reorderSchedule);
router.delete('/:id', protectAdmin, deleteSchedule);

export default router;
