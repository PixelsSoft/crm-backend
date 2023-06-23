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

// RoleSchema.pre<IRoles>("save", async function (next) {
//   if (this.access.all === true) {
//     this.access.payout = true;
//     this.access.attendance = true;
//     this.access.expenses = true;
//     this.access.users = true;
//     this.access.projects = true;
//     this.access.invoices = true;
//     this.access.customers = true;
//     this.access.leads = true;
//   }

//   next();
// });

const Role = mongoose.model<IRoles>("Role", RoleSchema);

export default Role;
