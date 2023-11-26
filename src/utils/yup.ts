/**
 * Validate a yup schema against an object and returns the errors if any
 */
export const validateYupSchemaAgainstAnObject = async function (
    schema: any,
    object: any
) {
    try {
        await schema.validate(object, {
            abortEarly: false,
            stripUnknown: true,
        });
        return true;
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return error.errors;
        }
    }
    return [];
}


export const validateYupMiddlewareAgainstReqBody = function (schema: any) {
    return async function (req: any, res: any, next: any) {
        let validate = await validateYupSchemaAgainstAnObject(schema, req.body)
        if (validate.length > 0) {
            return res.status(400).json({
                message: "Validation Error",
                errors: validate
            })
        }
        next()
    }
}
