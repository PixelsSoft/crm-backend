import mongoose, { Document } from "mongoose";

export interface IRoles extends Document {
  title: string;
  access: {
    all: boolean;
    payout: boolean;
    attendance: boolean;
    expenses: boolean;
    users: boolean;
    projects: boolean;
    invoices: boolean;
    customers: boolean;
    leads: boolean;
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
    payout: {
      type: Boolean,
      default: false,
    },
    attendance: {
      type: Boolean,
      default: false,
    },
    expenses: {
      type: Boolean,
      default: false,
    },
    users: {
      type: Boolean,
      default: false,
    },
    projects: {
      type: Boolean,
      default: false,
    },
    invoices: {
      type: Boolean,
      default: false,
    },
    customers: {
      type: Boolean,
      default: false,
    },
    leads: {
      type: Boolean,
      default: false,
    },
  },
});

RoleSchema.pre<IRoles>("save", async function (next) {
  if (this.access.all === true) {
    this.access.payout = true;
    this.access.attendance = true;
    this.access.expenses = true;
    this.access.users = true;
    this.access.projects = true;
    this.access.invoices = true;
    this.access.customers = true;
    this.access.leads = true;
  }

  next();
});

const Role = mongoose.model<IRoles>("Role", RoleSchema);

export default Role;
