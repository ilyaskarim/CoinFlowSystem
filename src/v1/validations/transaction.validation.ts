import { InferType, number, object, string } from "yup";

export const createTransactionSchema = object({
  user_id: number().required("User ID is required"),
  amount: number().required("Amount is required"),
  coin_id: number().required("Coin ID is required"),
  transaction_type: string().oneOf(["DEPOSIT", "WITHDRAWAL"]).required("Transaction type is required"),
});
export type CreateTransactionSchema = InferType<typeof createTransactionSchema>;

export const updateTransactionSchema = object({
  id: number().required("ID is required"),
  user_id: number().optional(),
  amount: number().optional(),
  coin_id: number().optional(),
  transaction_type: string().oneOf(["DEPOSIT", "WITHDRAWAL"]).optional()
});
export type UpdateTransactionSchema = InferType<typeof updateTransactionSchema>;

export const deleteTransactionSchema = object({
  id: number().required("ID is required"),
});
export type DeleteTransactionSchema = InferType<typeof deleteTransactionSchema>;

export const getTransactionsSchema = object({
  user_id: number().optional(),
});
export type GetTransactionsSchema = InferType<typeof getTransactionsSchema>;


export const getTransactionSchema = object({
  id: number().required("ID is required"),
});
export type GetTransactionSchema = InferType<typeof getTransactionSchema>;
  