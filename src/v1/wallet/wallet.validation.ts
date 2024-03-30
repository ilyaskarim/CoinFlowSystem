import { object, string, number, InferType } from "yup";

export const createWalletSchema = object({
  username: string().required("Username is required"),
  application_user_id: string().required("Application User ID is required"),
  email: string().email().required("Email is required"),
});
export type CreateWalletSchema = InferType<typeof createWalletSchema>;

export const updateWalletSchema = object({
  id: number().required("ID is required"),
  username: string().required("Username is required"),
  application_user_id: string().required("Application User ID is required"),
  email: string().email().required("Email is required"),
});
export type UpdateWalletSchema = InferType<typeof updateWalletSchema>;
