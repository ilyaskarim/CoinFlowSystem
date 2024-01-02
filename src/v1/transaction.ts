import prisma from "./../database/prisma";
import { Response, Request } from "express";
import { generateError } from "../utils/errors";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    // Check if wallet_id exists
    const wallet = await prisma.wallet.findUnique({
      where: { id: req.body.input.wallet_id },
    });
    if (!wallet) {
      return res.status(400).json({ message: "Wallet not found" });
    }

    // Create transaction
    let response = await prisma.transaction.create({
      data: {
        transaction_type: req.body.input.transaction_type,
        user_id: req.body.input.user_id,
        wallet_id: req.body.input.wallet_id,
        amount: req.body.input.amount,
      },
    });

    res.status(200).json({
      message: "Transaction created successfully",
      user: response,
    });
  } catch (e) {
    generateError(res, e);
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body.input;

    // Check if transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (updateData.wallet_id) {
      const wallet = await prisma.wallet.findUnique({
        where: { id: existingTransaction.wallet_id },
      });
      if (!wallet) {
        return res.status(400).json({ message: "Wallet not found" });
      }
    }

    // Update the transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (e) {
    generateError(res, e);
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Delete the transaction
    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (e) {
    generateError(res, e);
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Retrieve the transaction
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (e) {
    generateError(res, e);
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();

    if (!transactions) {
      return res.status(404).json({ message: "Transactions not found" });
    }

    res.status(200).json(transactions);
  } catch (e) {
    generateError(res, e);
  }
};

export const getTransactionsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    // Retrieve transactions for the user
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: user?.id,
      },
    });

    res.status(200).json({
      transactions: transactions,
      message: "Transactions retrieved successfully",
    });
  } catch (e) {
    generateError(res, e);
  }
};
