"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var validator_1 = __importDefault(require("validator"));
var CustomerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Customer name is requured"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator_1.default.isEmail, "Please enter valid email"],
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Invoice",
        },
    ],
    _createdAt: {
        type: Date,
        default: Date.now(),
    },
});
var Customer = mongoose_1.default.model("Customer", CustomerSchema);
exports.default = Customer;
