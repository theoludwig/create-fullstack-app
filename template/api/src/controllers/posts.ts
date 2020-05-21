import { RequestHandler } from 'express';

import Post from '../models/posts';
import getPagesHelper from '../assets/utils/getPagesHelper';

export const getPosts: RequestHandler = async (req, res, next) => {
    return await getPagesHelper({ req, res, next }, Post);
}