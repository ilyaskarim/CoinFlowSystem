import { middlewareValidateYupSchemaAgainstReqBody, validateUserExistsSentThroughReqBody } from "../utils/middlewares";
import { createWalletSchema, updateWalletSchema } from "./wallet/wallet.validation";
import { createWallet, updateWallet, getWalletBalance } from "./wallet/wallet";

import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  getTransactionsByUser,
  updateTransaction,
} from "./transactions/transaction";
import { createTransactionSchema, updateTransactionSchema } from "./transactions/transaction.validation";

const v1Routes = express.Router();

/**
 * Wallet Apis Start
 */

v1Routes.post("/createWallet", middlewareValidateYupSchemaAgainstReqBody(createWalletSchema), createWallet);
v1Routes.put(
  "/updateWallet",
  validateUserExistsSentThroughReqBody("body.id"),
  middlewareValidateYupSchemaAgainstReqBody(updateWalletSchema),
  updateWallet,
);
v1Routes.get("/getWalletBalance", validateUserExistsSentThroughReqBody("body.input.id"), getWalletBalance);

/**
 * Wallet Apis End
 */

/**
 * Transaction Apis Start
 * */

v1Routes.post(
  "/createTransaction",
  validateUserExistsSentThroughReqBody("body.user_id"),
  middlewareValidateYupSchemaAgainstReqBody(createTransactionSchema),
  createTransaction,
);

v1Routes.put(
  "/updateTransaction/:id",
  validateUserExistsSentThroughReqBody("body.user_id"),
  middlewareValidateYupSchemaAgainstReqBody(updateTransactionSchema),
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
/**
 * Transaction Apis End
 */

export default v1Routes;
