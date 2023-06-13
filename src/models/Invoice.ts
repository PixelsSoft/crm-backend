import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: Number,
    default: 0,
  },
  customerEmail: {
    type: String,
    required: [true, "Customer Email is required"],
  },
  currency: {
    type: String,
    required: [true, "Currency is required"],
  },
  projectCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  address: {
    type: String,
    default: "",
  },
  address2: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  dateCreated: {
    type: String,
    default: Date.now(),
  },
  dueDate: {
    type: String,
    default: Date.now(),
  },
  memo: {
    type: String,
    default: "",
  },
  total: {
    type: Number,
    default: 0,
  },
  amountDue: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
