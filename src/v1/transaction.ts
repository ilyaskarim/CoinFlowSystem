import prisma from "../database/prisma";
import { generateError } from "../utils/errors";
import { Request, Response } from "express";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.create({
      data: req.body.input,
    });
    res.status(200).json({
      message: "Transaction created successfully",
      transaction: transaction,
    });
  } catch (e) {
    generateError(res, e);
  } 
};
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.update({
      where: { id: req.body.input.id },
      data: req.body.input,
    });
    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: transaction,
    });
  } catch (e) {
    generateError(res, e);
  }
};
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.delete({
      where: { id: req.body.input.id },
    });
    res.status(200).json({
      message: "Transaction deleted successfully",
      transaction: transaction,
    });
  } catch (e) {
    generateError(res, e);
  }
};
export const getTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: req.body.input.id },
    });
    res.status(200).json({
      message: "Transaction retrieved successfully",
      transaction: transaction,
    });
  } catch (e) {
    generateError(res, e);
  }
};
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body.input;
    let transactions;
    if (user_id) {
      transactions = await prisma.transaction.findMany({
        where: { user_id: user_id },
      });
    } else {
      transactions = await prisma.transaction.findMany();
    }
    res.status(200).json({
      message: "Transactions retrieved successfully",
      transactions: transactions,
    });
  } catch (e) {
    generateError(res, e);
  }
};