import mongoose from "mongoose";

const CVSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Assuming Employee schema is used
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  pdfData: {
    type: Buffer, // To store the binary data of the PDF
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CV = mongoose.model("CV", CVSchema);

export default CV;
