import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import Posts from "../models/posts";
import getPagesHelper from "../assets/utils/getPagesHelper";
import errorHandler from "../assets/utils/errorHandler";
import { serverError } from "../assets/config/errors";

export const getPosts: RequestHandler = async (req, res, next) => {
    return await getPagesHelper({ req, res, next }, Posts);
};

export const createPost: RequestHandler = async (req, res, next) => {
    const { title } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandler(next, {
            message: errors.array()[0].msg,
            statusCode: 400
        });
    }
    try {
        const postCreated = await Posts.create({ title });
        return res.status(201).json(postCreated);
    } catch (error) {
        console.log(error);
        return errorHandler(next, serverError);
    }
};
