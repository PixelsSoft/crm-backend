import mongoose, { Document, Types } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import validator from "validator";
import { IRoles } from "./Role";

export interface IUser extends Document {
  _id: string;
  fullName: string;
  position: string;
  company: string;
  designation: string;
  salary: number;
  phoneNumber: string;
  profilePic: {
    url: string;
    path: string;
  };
  email: mongoose.SchemaDefinitionProperty<string> | undefined;
  password: string;
  role: Types.ObjectId | IRoles;
  _createdAt: Date;
}

export interface IUserWithMethods extends IUser {
  comparePassword(password: string): Promise<boolean>;
  generateJwtToken(): string | undefined;
}

const UserSchema = new mongoose.Schema<IUser, IUserWithMethods>({
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  position: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
  },
  salary: {
    type: Number,
    default: 0,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  profilePic: {
    url: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
    validate: [validator.isEmail, "Wrong email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password should be minimum 6 characters long"],
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  _createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password as string, 10);
});

UserSchema.methods.generateJwtToken = function () {
  return (
    process.env.JWT_SECRET &&
    jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    })
  );
};

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// UserSchema.methods.generateResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; //Expires in 30 minutes.

//   return resetToken;
// };

const User = mongoose.model("User", UserSchema);

export default User;
