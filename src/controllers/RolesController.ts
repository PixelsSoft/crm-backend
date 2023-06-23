import Role from "../models/Role";
import ErrorHandler from "../helpers/ErrorHandler";
import CustomResponse from "../helpers/CustomResponse";
import AsyncHandler from "../helpers/AsyncHandler";
import { NextFunction, Request, Response } from "express";

type TController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | {}>;

export const createRole: TController = AsyncHandler(async (req, res, next) => {
  const {
    title,
    access: {
      all,
      allowDashboard,
      allowViewInvoices,
      allowCreateInvoices,
      allowViewCustomers,
      allowCreateCustomers,
      allowViewProjects,
      allowCreateProjects,
      allowSales,
      allowViewUsers,
      allowCreateUsers,
      allowReports,
      allowViewExpenses,
      allowCreateExpenses,
      allowPayouts,
      allowAttendance,
      allowLeads,
    },
  } = req.body;
  const newRole = await Role.create({
    title,
    access: {
      all,
      allowDashboard,
      allowViewInvoices,
      allowCreateInvoices,
      allowViewCustomers,
      allowCreateCustomers,
      allowViewProjects,
      allowCreateProjects,
      allowSales,
      allowViewUsers,
      allowCreateUsers,
      allowReports,
      allowViewExpenses,
      allowCreateExpenses,
      allowPayouts,
      allowAttendance,
      allowLeads,
    },
  });

  await newRole.save();
  res.status(201).json(new CustomResponse(newRole, true, "Success"));
});

export const getAllRoles: TController = AsyncHandler(async (req, res, next) => {
  const roles = await Role.find({});
  res.status(200).json(new CustomResponse(roles, true));
});

export const deleteRole: TController = AsyncHandler(async (req, res, next) => {
  const roleId = req.params.id;

  const role = await Role.findById(roleId);
  if (!role) return next(new ErrorHandler("Not found", 404));
  await role.deleteOne();
  res.status(200).json(new CustomResponse(null, true, "Role deleted"));
});
