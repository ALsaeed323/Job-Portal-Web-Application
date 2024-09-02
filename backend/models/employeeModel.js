import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  professionalSummary: { type: String },
  skills: { type: [String], required: true },
  experiences: [
    {
      jobTitle: { type: String, required: true },
      companyName: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      description: { type: String, required: true },
    },
  ],
  education: [
    {
      institutionName: { type: String, required: true },
      degree: { type: String, required: true },
      graduationYear: { type: Number, required: true },
    },
  ],
  userType: { type: String, default: 'employee' }, // Default user type
  profileCompleted: { type: Boolean, default: false }, // New field to track profile completion
}, { timestamps: true });

// Middleware to hash password before saving
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
