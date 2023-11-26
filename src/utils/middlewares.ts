import prisma from "../database/prisma";
import get from "lodash.get";

/**
 * Validate a yup schema against an object and returns the errors if any
 */
export const validateYupSchemaAgainstAnObject = async function (schema: any, object: any) {
  try {
    await schema.validate(object, {
      abortEarly: false,
      stripUnknown: true,
    });
    return true;
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return error.errors;
    }
  }
  return [];
};

export const middlewareValidateYupSchemaAgainstReqBody = function (schema: any) {
  return async function (req: any, res: any, next: any) {
    let validate = await validateYupSchemaAgainstAnObject(schema, req.body.input);
    if (validate.length > 0) {
      return res.status(400).json({
        message: "Validation Error",
        errors: validate,
      });
    }
    next();
  };
};

export const validateUserExistsSentThroughReqBody = function (path: any) {
  return async function (req: any, res: any, next: any) {
    let user = await prisma.user.findUnique({
      where: {
        id: get(req, path, null),
      },
    });
    if (user === null) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    req.CurrentRequestUser = user;
    next();
  };
};

export const requestLogger = function (req: any, _res: any, next: any) {
  console.log(`[${req.method}] ${req.url}`);
  next();
};
