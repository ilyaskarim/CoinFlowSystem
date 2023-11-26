import { Response } from "express";
export const generateError = function (res: Response, error: any) {
  res.status(error.statusCode || 500).json({
    message: "Something broke!",
    error: error.message || "Something broke!",
  });
};
