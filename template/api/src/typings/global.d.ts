import { Request, Response, NextFunction } from 'express';
import { Model, BuildOptions } from "sequelize/types";

declare global {
    interface ResponseError extends Error {
        statusCode?: number;
    }

    interface ErrorHandlerObject {
        statusCode: number;
        message: string;
    }
    
    interface RequestHandlerObject {
        req: Request;
        res: Response;
        next: NextFunction;
    }

    type SequelizeModelInstance = typeof Model & {
        new(values?: object, options?: BuildOptions): Model;
    }
}
