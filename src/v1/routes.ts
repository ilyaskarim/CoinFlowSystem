import { middlewareValidateYupSchemaAgainstReqBody, validateUserExistsSentThroughReqBody } from "../utils/middlewares";
import { createUserSchema, updateUserSchema } from "./validations/user.validation";
import { createUser, getUserBalance, updateUser } from "./user";

import express from "express";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionSchema,
  getTransactionsSchema,
  updateTransactionSchema,
} from "./validations/transaction.validation";
import { deleteTransaction, getTransaction, getTransactions } from "./transaction";
import { updateTransaction } from "./transaction";
import { createTransaction } from "./transaction";

const v1Routes = express.Router();
v1Routes.post(
  "/createTransaction",
  middlewareValidateYupSchemaAgainstReqBody(createTransactionSchema),
  createTransaction,
);
v1Routes.put(
  "/updateTransaction",
  middlewareValidateYupSchemaAgainstReqBody(updateTransactionSchema),
  updateTransaction,
);
v1Routes.delete(
  "/deleteTransaction",
  middlewareValidateYupSchemaAgainstReqBody(deleteTransactionSchema),
  deleteTransaction,
);
v1Routes.get(
  "/getTransaction",
  middlewareValidateYupSchemaAgainstReqBody(getTransactionSchema),
  getTransaction,
);
v1Routes.get(
  "/getTransactions",
  middlewareValidateYupSchemaAgainstReqBody(getTransactionsSchema),
  getTransactions,
);

v1Routes.post("/createUser", middlewareValidateYupSchemaAgainstReqBody(createUserSchema), createUser);
v1Routes.put(
  "/updateUser",
  validateUserExistsSentThroughReqBody("body.input.id"),
  middlewareValidateYupSchemaAgainstReqBody(updateUserSchema),
  updateUser,
);
v1Routes.get("/getUserBalance", validateUserExistsSentThroughReqBody("body.input.id"), getUserBalance);
export default v1Routes;
