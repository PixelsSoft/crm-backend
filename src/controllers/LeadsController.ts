import Leads from "../models/Leads";
import AsyncHandler from "../helpers/AsyncHandler";
import ErrorHandler from "../helpers/ErrorHandler";
import CustomResponse from "../helpers/CustomResponse";

export const createNewLead = AsyncHandler(async (req, res, next) => {
  const newLead = await Leads.create(req.body);
  res.status(201).json(new CustomResponse(newLead, true, "Success"));
});

export const getAllLeads = AsyncHandler(async (req, res, next) => {
  const leads = await Leads.find({});

  res.status(200).json(new CustomResponse(leads, true, "Success"));
});

export const updateLeadStatus = AsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const { status } = req.body;

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
