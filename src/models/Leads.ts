import mongoose from "mongoose";
import validator from "validator";

const LeadsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Email is not valid"],
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Responded", "Not Responded"],
    default: "Responded",
  },
  comments: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  _createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Leads = mongoose.model("Leads", LeadsSchema);

export default Leads;
