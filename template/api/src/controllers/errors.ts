import { RequestHandler, ErrorRequestHandler } from "express";

import errorHandler from "../assets/utils/errorHandler";
import { serverError } from "../assets/config/errors";
import { isProduction } from "../assets/config/config";

export const get404: RequestHandler = (_req, _res, next) => {
    return errorHandler(next, {
        statusCode: 404,
        message: "The route doesn't exist!"
    });
};

export const get500: ErrorRequestHandler = (
    error: ResponseError,
    _req,
    res,
    _next
) => {
    console.error(error);
    const { statusCode, message } = error;
    if (isProduction && !statusCode) {
        return res.status(serverError.statusCode).json(serverError.message);
    }
    return res.status(statusCode || 500).json({ message });
};
