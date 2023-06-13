import User, { IUserWithMethods } from "../models/User";
import AsyncHandler from "../helpers/AsyncHandler";
import CustomResponse from "../helpers/CustomResponse";
import ErrorHandler from "../helpers/ErrorHandler";

export const createUser = AsyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  if (req.file) {
    user.profilePic.url = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    user.profilePic.path = req.file.filename;
  }
  await user.save();
  res.status(201).json(new CustomResponse(user, true, "User created"));
});

export const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user: IUserWithMethods | null = await User.findOne({ email });

  if (!user)
    return next(new ErrorHandler("No account found with this email", 404));

  let isPasswordValid: boolean = await user.comparePassword(password);

  if (!isPasswordValid) return next(new ErrorHandler("Invalid Password", 400));

  let token = user.generateJwtToken();
  res.status(201).json(new CustomResponse(token, true));
});

export const getAllUsers = AsyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(new CustomResponse(users, true));
});
