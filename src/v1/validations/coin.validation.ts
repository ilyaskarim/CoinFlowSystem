import { InferType, number, object, string } from "yup";

export const createCoinSchema = object({
  name: string().required("Name is required"),
});
export type CreateCoinSchema = InferType<typeof createCoinSchema>;

export const updateCoinSchema = object({
  id: number().required("ID is required"),
  name: string().required("Name is required"),
});
export type UpdateCoinSchema = InferType<typeof updateCoinSchema>;


export const createCoinRateSchema = object({
  coin_one_id: number().required("Coin One ID is required"),
  coin_two_id: number().required("Coin Two ID is required"),
  rate: number().required("Rate is required"),
});
export type CreateCoinRateSchema = InferType<typeof createCoinRateSchema>;

export const updateCoinRateSchema = object({
  id: number().required("ID is required"),
  coin_one_id: number().required("Coin One ID is required"),
  coin_two_id: number().required("Coin Two ID is required"),
  rate: number().required("Rate is required"),
});
export type UpdateCoinRateSchema = InferType<typeof updateCoinRateSchema>;
