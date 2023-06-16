"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var InvoiceSchema = new mongoose_1.default.Schema({
    invoiceNumber: {
        type: String,
        default: 0,
        unique: true,
    },
    customerName: {
        type: String,
        required: [true, "Customer name is required"],
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
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    customer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Customer",
    },
});
var Invoice = mongoose_1.default.model("Invoice", InvoiceSchema);
exports.default = Invoice;
