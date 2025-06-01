import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/eventsControllers.js';

const router = Router();

router.post('/registers', createEvent);
router.get('/registers', getEvents);
router.get('/registers/:id', getEventById);
router.put('/registers/:id', updateEvent);
router.delete('/registers/:id', deleteEvent);

export default router;
