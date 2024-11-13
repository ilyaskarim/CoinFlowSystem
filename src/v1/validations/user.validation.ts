import { object, string, number, date, InferType } from "yup";

export const createUserSchema = object({
  id: string().required("ID is required"),
  username: string().required("Username is required"),
  application_user_id: string().required("Application User ID is required"),
  email: string().email().required("Email is required"),
});
export type CreateUserSchema = InferType<typeof createUserSchema>;

export const updateUserSchema = object({
  id: string().required("ID is required"),
  username: string().required("Username is required"),
  application_user_id: string().required("Application User ID is required"),
  email: string().email().required("Email is required"),
});
export type UpdateUserSchema = InferType<typeof updateUserSchema>;

export const getUserBalanceSchema = object({
  coin_id: number().required("Coin ID is required"),
});
export type GetUserBalanceSchema = InferType<typeof getUserBalanceSchema>;
