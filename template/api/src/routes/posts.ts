import { Router } from 'express';

import * as postsController from '../controllers/posts';

const PostsRouter = Router();

PostsRouter.route('/')

    .get(postsController.getPosts);

module.exports = PostsRouter;