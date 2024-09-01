import mongoose from 'mongoose';

const EmployerSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  companyName: { type: String },
  companyDescription: { type: String },
  specialties: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  userType: { type: String, default: 'employer' },
  profileCompleted: { type: Boolean, default: false }, // New field to track profile completion
  createdAt: { type: Date, default: Date.now },
});

const Employer = mongoose.model('Employer', EmployerSchema);
export default Employer;
