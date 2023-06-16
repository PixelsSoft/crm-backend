import mongoose from "mongoose";
import validator from "validator";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Customer name is requured"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please enter valid email"],
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  address2: {
    type: String,
    default: "",
  },
  purchaseHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
  ],
  _createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
