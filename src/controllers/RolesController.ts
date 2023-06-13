import Role from "../models/Role";
import ErrorHandler from "../helpers/ErrorHandler";
import CustomResponse from "../helpers/CustomResponse";
import AsyncHandler from "../helpers/AsyncHandler";

export const createRole = AsyncHandler(async (req, res, next) => {
  const { title, access } = req.body;
  const newRole = await Role.create({
    title,
    access: {
      all: access.all,
      payout: access.payout,
      expenses: access.expenses,
      attendance: access.attendance,
      users: access.users,
      projects: access.projects,
      invoices: access.invoices,
      customers: access.customers,
      leads: access.leads,
    },
  });

  await newRole.save();
  res.status(201).json(new CustomResponse(newRole, true, "Success"));
});

export const getAllRoles = AsyncHandler(async (req, res, next) => {
  const roles = await Role.find({});
  res.status(200).json(new CustomResponse(roles, true));
});

export const deleteRole = AsyncHandler(async (req, res, next) => {
  const roleId = req.params.id;

  const role = await Role.findById(roleId);
  if (!role) return next(new ErrorHandler("Not found", 404));
  await role.deleteOne();
  res.status(200).json(new CustomResponse(null, true, "Role deleted"));
});
