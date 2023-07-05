import Invoice from "../models/Invoice";
import AsyncHandler from "../helpers/AsyncHandler";
import CustomResponse from "../helpers/CustomResponse";
import Customer from "../models/Customer";
import formatInvoiceNumber from "../helpers/FormatInvoiceNumber";
import ErrorHandler from "../helpers/ErrorHandler";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";

type TController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | {}>;

export const createInvoice: TController = AsyncHandler(
  async (req, res, next) => {
    const {
      invoiceNumber,
      customer,
      customerName,
      customerEmail,
      address,
      address2,
      phoneNumber,
      projectCategory,
      currency,
      dateCreated,
      dueDate,
      memo,
      total,
      amountDue,
      quantity,
      description,
    } = req.body;

    const newInvoice = await Invoice.create({
      invoiceNumber,
      customerEmail,
      customerName,
      address,
      address2,
      phoneNumber,
      projectCategory,
      currency,
      dateCreated,
      dueDate,
      total,
      amountDue,
      memo,
      quantity,
      description,
    });

    const requestUrl = req.headers.referer || "Unknown";

    if (!customer) {
      const newCustomer = await Customer.create({
        fullName: customerName,
        email: customerEmail,
        address,
        address2,
        phoneNumber,
      });

      newInvoice.customer = newCustomer._id;
      newCustomer.purchaseHistory.push(newInvoice._id);
      await newCustomer.save();
    } else {
      const previousCustomer = await Customer.findById(customer);

      if (!previousCustomer)
        return next(new ErrorHandler("Customer not found", 404));

      newInvoice.customer = previousCustomer._id;
      previousCustomer.purchaseHistory.push(newInvoice._id);

      await previousCustomer.save();
    }

    let shareLink = `${requestUrl}checkout/${newInvoice._id}?amount=${newInvoice.total}&currency=${newInvoice.currency}&email=${newInvoice.customerEmail}&fullName=${newInvoice.customerName}`;

    newInvoice.shareLink = shareLink;

    await newInvoice.save();

    res.status(201).json(new CustomResponse(newInvoice, true, "Success"));
  }
);

export const getAllInvoices: TController = AsyncHandler(
  async (req, res, next) => {
    const invoices = await Invoice.find({});
    res.status(200).json(new CustomResponse(invoices, true));
  }
);

export const deleteInvoice: TController = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;

    const invoice = await Invoice.findById(id);
    if (!invoice) return next(new ErrorHandler("Not found", 404));

    await Customer.findByIdAndUpdate(invoice.customer, {
      $pull: { purchaseHistory: invoice._id },
    });

    await invoice.deleteOne();
    res.status(200).json(new CustomResponse(null, true, "Invoice deleted"));
  }
);

export const getInvoiceDetails: TController = AsyncHandler(
  async (req, res, next) => {
    const id = req.params.id;

    const invoice = await Invoice.findById(id)
      .populate("customer")
      .populate("projectCategory")
      .exec();
    if (!invoice) return next(new ErrorHandler("Not found", 404));

    res.status(200).json(new CustomResponse(invoice, true));
  }
);

export const getInvoiceNumber: TController = AsyncHandler(
  async (req, res, next) => {
    const lastInvoice = await Invoice.findOne()
      .sort({ invoiceNumber: -1 })
      .exec();

    let nextInvoiceNumber = 1;

    if (lastInvoice) {
      const highestNumber = lastInvoice.invoiceNumber;
      nextInvoiceNumber = parseInt(highestNumber) + 1;
    }

    const formattedInvoiceNumber = formatInvoiceNumber(nextInvoiceNumber);
    res.status(200).json(new CustomResponse(formattedInvoiceNumber, true));
  }
);

export const getPaymentIntent: TController = AsyncHandler(
  async (req, res, next) => {
    const { amount, id, email, fullName } = req.body;
    console.log(id);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      //@ts-ignore
      apiVersion: null,
    });

    const newCustomer = await stripe.customers.create({
      email,
      name: fullName,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      customer: newCustomer.id,
      amount: parseInt(amount + "00"),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res
      .status(200)
      .json(
        new CustomResponse({ clientSecret: paymentIntent.client_secret }, true)
      );
  }
);

export const generateInvoiceShareLink: TController = AsyncHandler(
  async (req, res, next) => {}
);

export const sendInvoiceEmail: TController = AsyncHandler(
  async (req, res, next) => {}
);
