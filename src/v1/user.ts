import prisma from "./../database/prisma";
import { Response, Request } from "express";
import { generateError } from "../utils/errors";

export const createUser = async (req: Request, res: Response) => {
  try {
    let response = await prisma.user.create({
      data: req.body.input,
    });
    res.status(200).json({
      message: "User created successfully",
      user: response,
    });
  } catch (e) {
    console.log(e); 
    generateError(res, e);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.CurrentRequestUser;
    const update = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: req.body.input,
    });
    res.status(200).json({
      message: "User updated successfully",
      user: update,
    });
  } catch (e) {
    generateError(res, e);
  }
};

export const getUserBalanceByCoin = async (req: Request, res: Response) => {
  const { coin_id } = req.body.input;
  const user = req.CurrentRequestUser;
  const deposits = await prisma.transaction.findMany({
    where: {
      user_id: user.id,
      coin_id: coin_id,
      transaction_type: "DEPOSIT",
    },
  });
  const withdrawals = await prisma.transaction.findMany({
    where: {
      user_id: user.id,
      coin_id: coin_id,
      transaction_type: "WITHDRAWAL",
    },
  });
  const coin = await prisma.coin.findUnique({
    where: {
      id: coin_id,
    },
  });

  if (!coin) {
    res.status(404).json({
      message: "Coin not found",
    });
  }

  const balance =
    deposits.reduce((acc, transaction) => acc + transaction.amount, 0) -
    withdrawals.reduce((acc, transaction) => acc + transaction.amount, 0);
  res.status(200).json({
    message: "getUserBalance",
    balance: balance,
    coin: coin,
  });
};

export const getUserBalance = async (req: Request, res: Response) => {
  const user = req.CurrentRequestUser;
  const userAllTransactions = await prisma.transaction.findMany({
    where: {
      user_id: user.id,
    },
  });

  const coins = userAllTransactions.map((transaction) => transaction.coin_id);
  const uniqueCoins = [...new Set(coins)];
  const balances: Record<string, number> = {};

  for (const coinId of uniqueCoins) {
    const coin = await prisma.coin.findUnique({
      where: {
        id: coinId,
      },
    });
    if (!coin) {
      continue;
    }
    const transactions = userAllTransactions.filter((transaction) => transaction.coin_id === coinId);
    const deposits = transactions.filter((transaction) => transaction.transaction_type === "DEPOSIT");
    const withdrawals = transactions.filter((transaction) => transaction.transaction_type === "WITHDRAWAL");
    const balance =
      deposits.reduce((acc, transaction) => acc + transaction.amount, 0) -
      withdrawals.reduce((acc, transaction) => acc + transaction.amount, 0);
    balances[coin.name] = balance;
  }
  res.status(200).json({
    message: "getUserBalance",
    balances: balances,
  });
};
