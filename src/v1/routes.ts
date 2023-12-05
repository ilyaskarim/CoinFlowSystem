import { middlewareValidateYupSchemaAgainstReqBody, validateUserExistsSentThroughReqBody } from "../utils/middlewares";
import { createUserSchema, updateUserSchema } from "./user.validation";
import { createUser, getUserBalance, updateUser } from "./user";

import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  getTransactionsByUser,
  updateTransaction,
} from "./transaction";
import { transactionSchema } from "./transaction.validation";

const v1Routes = express.Router();

v1Routes.post(
  "/createTransaction",
  validateUserExistsSentThroughReqBody("body.user_id"),
  middlewareValidateYupSchemaAgainstReqBody(transactionSchema),
  createTransaction,
);

v1Routes.put(
  "/updateTransaction/:id",
  validateUserExistsSentThroughReqBody("body.user_id"),
  middlewareValidateYupSchemaAgainstReqBody(transactionSchema),
  updateTransaction,
);

v1Routes.delete("/deleteTransaction/:id", deleteTransaction);

v1Routes.get("/getTransaction/:id", getTransaction);

v1Routes.get("/getTransactions", getTransactions);

v1Routes.get(
  "/getTransactionsByUser/:userId",
  validateUserExistsSentThroughReqBody("params.userId"),
  getTransactionsByUser,
);

v1Routes.post("/createWallet", function (req, res) {
  res.status(200).json({
    message: "createWallet",
  });
});

v1Routes.post("/createUser", middlewareValidateYupSchemaAgainstReqBody(createUserSchema), createUser);
v1Routes.put(
  "/updateUser",
  validateUserExistsSentThroughReqBody("body.id"),
  middlewareValidateYupSchemaAgainstReqBody(updateUserSchema),
  updateUser,
);
v1Routes.get("/getUserBalance", validateUserExistsSentThroughReqBody("body.input.id"), getUserBalance);
export default v1Routes;
