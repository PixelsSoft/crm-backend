import mongoose, { Document } from "mongoose";

export interface IRoles extends Document {
  title: string;
  access: {
    all: boolean;
    allowDashboard: boolean;
    allowViewInvoices: boolean;
    allowCreateInvoices: boolean;
    allowViewCustomers: boolean;
    allowCreateCustomers: boolean;
    allowViewProjects: boolean;
    allowCreateProjects: boolean;
    allowSales: boolean;
    allowViewUsers: boolean;
    allowCreateUsers: boolean;
    allowReports: boolean;
    allowViewExpenses: boolean;
    allowCreateExpenses: boolean;
    allowPayouts: boolean;
    allowAttendance: boolean;
    allowLeads: boolean;
  };
}

const RoleSchema = new mongoose.Schema<IRoles>({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  access: {
    all: {
      type: Boolean,
      default: false,
    },
    allowDashboard: {
      type: Boolean,
      default: false,
    },
    allowViewInvoices: {
      type: Boolean,
      default: false,
    },
    allowCreateInvoices: {
      type: Boolean,
      default: false,
    },
    allowViewCustomers: {
      type: Boolean,
      default: false,
    },
    allowCreateCustomers: {
      type: Boolean,
      default: false,
    },
    allowViewProjects: {
      type: Boolean,
      default: false,
    },
    allowCreateProjects: {
      type: Boolean,
      default: false,
    },
    allowSales: {
      type: Boolean,
      default: false,
    },
    allowViewUsers: {
      type: Boolean,
      default: false,
    },
    allowCreateUsers: {
      type: Boolean,
      default: false,
    },
    allowReports: {
      type: Boolean,
      default: false,
    },
    allowViewExpenses: {
      type: Boolean,
      default: false,
    },
    allowCreateExpenses: {
      type: Boolean,
      default: false,
    },
    allowPayouts: {
      type: Boolean,
      default: false,
    },
    allowAttendance: {
      type: Boolean,
      default: false,
    },
    allowLeads: {
      type: Boolean,
      default: false,
    },
  },
});

RoleSchema.pre<IRoles>("save", async function (next) {
  const { access } = this;
  if (access.all === true) {
    access.allowDashboard = true;
    access.allowViewInvoices = true;
    access.allowCreateInvoices = true;
    access.allowViewCustomers = true;
    access.allowCreateCustomers = true;
    access.allowViewProjects = true;
    access.allowCreateProjects = true;
    access.allowSales = true;
    access.allowViewUsers = true;
    access.allowCreateUsers = true;
    access.allowReports = true;
    access.allowViewExpenses = true;
    access.allowCreateExpenses = true;
    access.allowPayouts = true;
    access.allowAttendance = true;
    access.allowLeads = true;
  }

  next();
});

const Role = mongoose.model<IRoles>("Role", RoleSchema);

export default Role;
