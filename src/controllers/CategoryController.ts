import AsyncHandler from "../helpers/AsyncHandler";
import CustomResponse from "../helpers/CustomResponse";
import ErrorHandler from "../helpers/ErrorHandler";
import Category from "../models/Category";

export const createCategory = AsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await Category.create({ name });

  await newCategory.save();
  res.status(201).json(new CustomResponse(newCategory, true, "Category added"));
});

export const getAllCategories = AsyncHandler(async (req, res, next) => {
  const categories = await Category.find({});
  res.status(200).json(new CustomResponse(categories, true));
});

export const deleteCategory = AsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const isFound = await Category.findById({ _id: id });

  if (!isFound) {
    return next(new ErrorHandler("Not Found", 404));
  }

  await isFound.deleteOne();
  res.status(201).json(new CustomResponse(null, true, "Category deleted"));
});
