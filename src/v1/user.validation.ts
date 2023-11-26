import {object, string, number, date, InferType} from 'yup';

export const createUserSchema = object({
    username: string().required('Username is required'),
    application_user_id: string().required('Application User ID is required'),
    email: string().email().required('Email is required'),
})
export type CreateUserSchema = InferType<typeof createUserSchema>;

export const updateUserSchema = object({
    id: number().required('ID is required'),
    username: string().required('Username is required'),
    application_user_id: string().required('Application User ID is required'),
    email: string().email().required('Email is required'),
})
export type UpdateUserSchema = InferType<typeof updateUserSchema>;
