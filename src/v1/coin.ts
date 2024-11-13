import { Response, Request } from "express";
import prisma from "../database/prisma";

export const createCoin = async (req: Request, res: Response) => {
  const { input } = req.body;
  const coin = await prisma.coin.create({
    data: input,
  });
  res.status(200).json({
    message: "Coin created successfully",
    coin,
  });
};


export const createCoinRate = async (req: Request, res: Response) => {
  const { input } = req.body;
  const coinRate = await prisma.coinRate.create({
    data: input,
  });
  res.status(200).json({
    message: "Coin rate created successfully",
    coinRate,
  });
};
