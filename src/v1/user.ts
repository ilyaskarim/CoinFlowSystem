import prisma from "./../database/prisma";
import { Response, Request } from "express";
import { generateError } from "../utils/errors";

export const createUser = async (req: Request, res: Response) => {
  try {
    let response = await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        application_user_id: req.body.application_user_id,
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

export const getUserBalance = (req: Request, res: Response) => {
  res.status(200).json({
    message: "getUserBalance",
  });
};
