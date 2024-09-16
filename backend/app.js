import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import connectDB from './config/db.js'; 
import cors from 'cors';
import employerRoutes from './routes/employerRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to handle CORS
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



// Connect to the database
connectDB();


// Middleware setup
app.use(express.json());
app.use(session({ 
  secret: "Your_Secret_Key",
  resave: true,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));


app.use('/api/employers', employerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/jobs', jobRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://127.0.0.1:${PORT}`);
});

export default app;
