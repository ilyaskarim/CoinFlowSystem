import { object, string, number, InferType, date } from "yup";

export const createTransactionSchema = object({
  transaction_type: string()
    .required("Transaction type is required")
    .oneOf(["credit", "debit"], "Transaction type must be either credit or debit"),
  user_id: number()
    .required("User ID is required")
    .positive("User ID must be a positive integer")
    .integer("User ID must be an integer"),
  wallet_id: number()
    .required("Wallet ID is required")
    .positive("Wallet ID must be a positive integer")
    .integer("Wallet ID must be an integer"),
  amount: number()
    .required("Amount is required")
    .positive("Amount must be a positive integer")
    .integer("Amount must be an integer"),
  created_at: date()
    .default(() => new Date())
    .required("Creation date is required"),
  updated_at: date()
    .default(() => new Date())
    .required("Update date is required"),
});
export type CreateTransactionSchema = InferType<typeof createTransactionSchema>;

export const updateTransactionSchema = object({
  transaction_type: string().optional().oneOf(["credit", "debit"], "Transaction type must be either credit or debit"),
  user_id: number().optional().positive("User ID must be a positive integer").integer("User ID must be an integer"),
  amount: number().optional().positive("Amount must be a positive integer").integer("Amount must be an integer"),
});
export type UpdateTransactionSchema = InferType<typeof updateTransactionSchema>;
