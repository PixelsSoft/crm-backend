import Customer from "../models/Customer";
import AsyncHandler from "../helpers/AsyncHandler";
import ErrorHandler from "../helpers/ErrorHandler";
import CustomResponse from "../helpers/CustomResponse";
import { NextFunction, Request, Response } from "express";

type TController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | {}>;

export const createCustomer: TController = AsyncHandler(
  async (req, res, next) => {
    const newCustomer = await Customer.create(req.body);

    await newCustomer.save();
    res.status(201).json(new CustomResponse(newCustomer, true, "Success"));
  }
);

export const deleteCustomer: TController = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;

    const customer = await Customer.findById(id);
    if (!customer) return next(new ErrorHandler("Not Found", 404));

    await customer.deleteOne();
    res.status(200).json(new CustomResponse(null, true, "Customer deleted"));
  }
);

export const editCustomer: TController = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;

    const customer = await Customer.findById(id);

    if (!customer) return next(new ErrorHandler("Not Found", 404));

    for (const key in req.body) {
      if (Object.hasOwnProperty.call(req.body, key)) {
        (customer as Record<string, any>)[key] = req.body[key];
      }
    }

    await customer.save();

    res.status(201).json(new CustomResponse(null, true, "Success"));
  }
);

export const getCustomerDetails: TController = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;

    const customer = await Customer.findById(id);
    if (!customer) return next(new ErrorHandler("Not Found", 404));

    res.status(200).json(new CustomResponse(customer, true));
  }
);

export const getAllCustomers: TController = AsyncHandler(
  async (req, res, next) => {
    const customers = await Customer.find({});

    res.status(200).json(new CustomResponse(customers, true));
  }
);
