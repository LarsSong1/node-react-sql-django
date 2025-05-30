import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dateForm: { type: Date, required: true },
  hour: { type: String, required: true },            // Mongo no tiene tipo TIME, se usa string en formato HH:MM
  location: { type: String, required: true },
  address: { type: String, required: true },
  organizer: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  freeState: { type: Boolean, default: false },
  outstanding: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
