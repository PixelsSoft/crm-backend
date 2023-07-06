import ErrorHandler from "../helpers/ErrorHandler";
import AsyncHandler from "../helpers/AsyncHandler";
import * as jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { Request } from "express";

interface IAuthenticatedRequest extends Request {
  user?: IUser | null | undefined;
}

export const isAuthenticated = AsyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const token = req.headers.authorization;
    if (!token)
      return next(new ErrorHandler("Login to access this resource.", 401));

    if (process.env.JWT_SECRET) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as jwt.JwtPayload;

      req.user = await User.findById(decoded._id);
    }

    next();
  }
);
