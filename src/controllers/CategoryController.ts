import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../helpers/AsyncHandler";
import CustomResponse from "../helpers/CustomResponse";
import ErrorHandler from "../helpers/ErrorHandler";
import Category from "../models/Category";

type TController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | {}>;

export const createCategory: TController = AsyncHandler(
  async (req, res, next) => {
    const { name } = req.body;
    const newCategory = await Category.create({ name });

    await newCategory.save();
    res
      .status(201)
      .json(new CustomResponse(newCategory, true, "Category added"));
  }
);

export const getAllCategories: TController = AsyncHandler(
  async (req, res, next) => {
    const categories = await Category.find({});
    res.status(200).json(new CustomResponse(categories, true));
  }
);

export const deleteCategory: TController = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const isFound = await Category.findById({ _id: id });

    if (!isFound) {
      return next(new ErrorHandler("Not Found", 404));
    }

    await isFound.deleteOne();
    res.status(201).json(new CustomResponse(null, true, "Category deleted"));
  }
);
