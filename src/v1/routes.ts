import type {
    Request,
    Express
}  from "express"
import prisma from "./../database/prisma"
import {validateYupMiddlewareAgainstReqBody, validateYupSchemaAgainstAnObject} from "../utils/yup";
import {createUserSchema, updateUserSchema} from "./user.validation";

export const v1Routes = function (app: Express) {
    app.get('/api/v1/createTransaction', function (req,res) {
        res.status(200).json({
            message: "createTransaction"
        })
    });
    app.get('/api/v1/updateTransaction', function (req,res) {
        res.status(200).json({
            message: "updateTransaction"
        })
    });
    app.get('/api/v1/deleteTransaction', function (req,res) {
        res.status(200).json({
            message: "deleteTransaction"
        })
    });
    app.get('/api/v1/getTransaction', function (req,res) {
        res.status(200).json({
            message: "getTransaction"
        })
    });
    app.get('/api/v1/getTransactions', function (req,res) {
        res.status(200).json({
            message: "getTransactions"
        })
    });
    app.get('/api/v1/getTransactionsByUser', function (req,res) {
        res.status(200).json({
            message: "getTransactionsByUser"
        })
    });

    app.get('/api/v1/createWallet', function (req,res) {
        res.status(200).json({
            message: "createWallet"
        })
    });


    app.get('/api/v1/createUser', validateYupMiddlewareAgainstReqBody(createUserSchema) , async function (req,res) {
        let response = await prisma.user.create({
            data: {
                email: "ilyas.datoo@gmail.com" + Math.random(),
                username: "ilyas" + Math.random(),
                application_user_id: "123123" + Math.random()
            }
        })
        res.status(200).json({
            message: "createUser",
            users: await prisma.user.findMany(),
            response
        })
    });

    app.get('/api/v1/updateUser',  validateYupMiddlewareAgainstReqBody(updateUserSchema), function (req: Request,res) {
        res.status(200).json({
            message: "updateUser"
        })
    });


    app.get("/api/v1/getUserBalance", function (req,res) {
        res.status(200).json({
            message: "getUserBalance"
        })
    })
}
