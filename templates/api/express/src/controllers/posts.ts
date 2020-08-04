import { RequestHandler } from 'express'

import Post from '../models/post'
import { getPagesHelper } from '../utils/database/getPagesHelper'

export const getPosts: RequestHandler = async (req, res, next) => {
  return await getPagesHelper({ req, res, next }, Post)
}

export const createPost: RequestHandler = async (req, res, _next) => {
  const { title } = req.body
  const postCreated = await Post.create({ title })
  return res.status(201).json(postCreated)
}
