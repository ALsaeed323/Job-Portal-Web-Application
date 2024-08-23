import mongoose from 'mongoose';

const EmployerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyDescription: { type: String },
  specialties: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String, unique: true, required: true },
  address: { type: String },
  password: { type: String, required: true }, // Add the password field
  createdAt: { type: Date, default: Date.now },
});

const Employer = mongoose.model('Employer', EmployerSchema);
export default Employer;
