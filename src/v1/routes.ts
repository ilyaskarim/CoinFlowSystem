import { middlewareValidateYupSchemaAgainstReqBody, validateUserExistsSentThroughReqBody } from "../utils/middlewares";
import { createUserSchema, updateUserSchema } from "./user.validation";
import { createUser, getUserBalance, updateUser } from "./user";

import express from "express";

const v1Routes = express.Router();
v1Routes.get("/createTransaction", function (req, res) {
  res.status(200).json({
    message: "createTransaction",
  });
});
v1Routes.get("/updateTransaction", function (req, res) {
  res.status(200).json({
    message: "updateTransaction",
  });
});
v1Routes.delete("/deleteTransaction", function (req, res) {
  res.status(200).json({
    message: "deleteTransaction",
  });
});
v1Routes.get("/getTransaction", function (req, res) {
  res.status(200).json({
    message: "getTransaction",
  });
});
v1Routes.get("/getTransactions", function (req, res) {
  res.status(200).json({
    message: "getTransactions",
  });
});
v1Routes.get("/getTransactionsByUser", function (req, res) {
  res.status(200).json({
    message: "getTransactionsByUser",
  });
});

v1Routes.post("/createWallet", function (req, res) {
  res.status(200).json({
    message: "createWallet",
  });
});

v1Routes.post("/createUser", middlewareValidateYupSchemaAgainstReqBody(createUserSchema), createUser);
v1Routes.put(
  "/updateUser",
  validateUserExistsSentThroughReqBody("body.input.id"),
  middlewareValidateYupSchemaAgainstReqBody(updateUserSchema),
  updateUser,
);
v1Routes.get("/getUserBalance", validateUserExistsSentThroughReqBody("body.input.id"), getUserBalance);
export default v1Routes;
