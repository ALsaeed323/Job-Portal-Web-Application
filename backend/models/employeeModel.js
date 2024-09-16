import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const employeeSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  professionalSummary: { type: String },
  skills: { type: [String] },
  experiences: [
    {
      jobTitle: { type: String },
      companyName: { type: String },
      startDate: { type: Date },
      endDate: { type: Date},
      description: { type: String  },
    },
  ],
  education: [
    {
      institutionName: { type: String},
      degree: { type: String },
      graduationYear: { type: Number },
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
