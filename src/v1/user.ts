import prisma from "./../database/prisma";
import { Response, Request } from "express";
import { generateError } from "../utils/errors";

export const createUser = async (req: Request, res: Response) => {
  try {
    let response = await prisma.user.create({
      data: {
        email: req.body.input.email,
        username: req.body.input.username,
        application_user_id: req.body.input.application_user_id,
      },
    });
    res.status(200).json({
      message: "User created successfully",
      user: response,
    });
  } catch (e) {
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

export const getUserBalance = async (req: Request, res: Response) => {
  const { coin_id } = req.body.input;
  const user = req.CurrentRequestUser;
  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: user.id,
      coin_id: coin_id,
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

  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  res.status(200).json({
    message: "getUserBalance",
    balance: balance,
    coin: coin,
  });
};
