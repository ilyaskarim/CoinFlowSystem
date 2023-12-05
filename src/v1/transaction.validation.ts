import * as yup from "yup";

// Define the transaction validation schema
export const transactionSchema = yup.object({
  transaction_type: yup
    .string()
    .required("Transaction type is required")
    .oneOf(["credit", "debit"], "Transaction type must be either credit or debit"),
  user_id: yup
    .number()
    .required("User ID is required")
    .positive("User ID must be a positive integer")
    .integer("User ID must be an integer"),
  wallet_id: yup
    .number()
    .required("Wallet ID is required")
    .positive("Wallet ID must be a positive integer")
    .integer("Wallet ID must be an integer"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be a positive integer")
    .integer("Amount must be an integer"),
  created_at: yup
    .date()
    .default(() => new Date())
    .required("Creation date is required"),
  updated_at: yup
    .date()
    .default(() => new Date())
    .required("Update date is required"),
});

// Define the type for the expected shape of the transaction data
export interface TransactionData {
  transaction_type: "credit" | "debit";
  user_id: number;
  wallet_id: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
}
