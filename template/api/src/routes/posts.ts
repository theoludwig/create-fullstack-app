import { Router } from 'express'
import { body } from 'express-validator'

import * as postsController from '../controllers/posts'

const PostsRouter = Router()

PostsRouter.route('/')

  .get(postsController.getPosts)

  .post(
    [
      body('title')
        .isLength({ min: 5 })
        .withMessage(
          'You must enter a title with a minimum length of 5 characters.'
        )
        .trim()
    ],
    postsController.createPost
  )

module.exports = PostsRouter
