import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  sessionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastAccess: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Session = mongoose.model('EmployeesSession', SessionSchema);
export default Session;
