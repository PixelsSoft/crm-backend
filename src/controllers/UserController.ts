import User, { IUserWithMethods } from "../models/User";
import AsyncHandler from "../helpers/AsyncHandler";
import CustomResponse from "../helpers/CustomResponse";
import ErrorHandler from "../helpers/ErrorHandler";
import path from "path";
import fs from "fs";
import logger from "../helpers/Logger";
import { NextFunction, Request, Response } from "express";

type TController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | {}>;

export const createUser: TController = AsyncHandler(async (req, res, next) => {
  const salary = parseInt(req.body.salary);
  const user = await User.create({ ...req.body, salary });
  if (req.file) {
    user.profilePic.url = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    user.profilePic.path = req.file.filename;
  }
  await user.save();
  res.status(201).json(new CustomResponse(user, true, "User created"));
});

export const loginUser: TController = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user: IUserWithMethods | null = await User.findOne({ email }).populate(
    "role"
  );

  if (!user)
    return next(new ErrorHandler("No account found with this email", 404));

  let isPasswordValid: boolean = await user.comparePassword(password);
  if (!isPasswordValid) return next(new ErrorHandler("Invalid Password", 400));

  let token = user.generateJwtToken();
  res.status(201).json(new CustomResponse({ user, token }, true));
});

export const getAllUsers: TController = AsyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(new CustomResponse(users, true));
});

export const editUser: TController = AsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id });
  if (!user) return next(new ErrorHandler("Not found", 404));

  //delete previous profile picture
  if (req.file) {
    let filePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      user.profilePic.path
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        logger.error(err);
      }
    });
    user.profilePic.url = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    user.profilePic.path = req.file.filename;
  }

  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      if (key in user) {
        (user as Record<string, any>)[key] = req.body[key];
      }
    }
  }

  await user.save();
  res.status(200).json(new CustomResponse(null, true, "Profile updated!"));
});

export const deleteUser: TController = AsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Not Found", 404));

  let filePath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    user.profilePic.path
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      logger.error(err);
    }
  });

  await user.deleteOne();
  res.status(200).json(new CustomResponse(null, true, "Success!"));
});

export const getUserDetails: TController = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Not Found", 404));
    res.status(200).json(new CustomResponse(user, true));
  }
);
