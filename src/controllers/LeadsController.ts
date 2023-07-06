import Leads from "../models/Leads";
import AsyncHandler from "../helpers/AsyncHandler";
import ErrorHandler from "../helpers/ErrorHandler";
import CustomResponse from "../helpers/CustomResponse";
import { IUser } from "../models/User";
import { NextFunction, Request, Response } from "express";

interface IAuthenticatedRequest extends Request {
  user?: IUser;
}

export const createNewLead = AsyncHandler(
  async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ErrorHandler("Not authorized", 401));
    const newLead = await Leads.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(new CustomResponse(newLead, true, "Success"));
  }
);

export const getAllLeads = AsyncHandler(async (req, res, next) => {
  const leads = await Leads.find({}).populate("createdBy", "fullName email");

  res.status(200).json(new CustomResponse(leads, true, "Success"));
});

export const updateLeadStatus = AsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const { status } = req.body;
  console.log(id, status);

  const lead = await Leads.findById(id);
  if (!lead) return next(new ErrorHandler("Not Found", 404));

  lead.status = status;
  await lead.save();
  res.status(201).json(new CustomResponse(lead, true, "Success"));
});

export const deleteLead = AsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const lead = await Leads.findById(id);
  if (!lead) return next(new ErrorHandler("Not Found", 404));

  await lead.deleteOne();
  res
    .status(200)
    .json(new CustomResponse(null, true, "Lead deleted successfully"));
});

export const editLeadComments = AsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { comments } = req.body;

  const lead = await Leads.findById(id);

  if (!lead) return next(new ErrorHandler("Not found", 404));
  lead.comments = comments;
  await lead.save();
  res.status(201).json(new CustomResponse(lead, true));
});
