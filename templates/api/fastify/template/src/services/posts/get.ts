import { FastifyPluginAsync, FastifySchema } from 'fastify'
import { Static } from '@sinclair/typebox'

import {
  paginateModel,
  paginateModelSchema,
  paginateQuerySchema
} from '../../tools/database/paginateModel'
import Post, { postSchema } from '../../models/Post'

const paginatePostSchema = paginateModelSchema(postSchema)

type PaginatePostType = Static<typeof paginatePostSchema>

const getPostsSchema: FastifySchema = {
  description: 'GET all the posts',
  tags: ['posts'] as string[],
  querystring: paginateQuerySchema,
  response: {
    200: paginatePostSchema
  }
} as const

export const getPosts: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Querystring: Static<typeof paginateQuerySchema> }>({
    method: 'GET',
    url: '/posts',
    schema: getPostsSchema,
    handler: async (request, reply) => {
      const { page, itemsPerPage } = request.query
      const response: PaginatePostType = await paginateModel({
        Model: Post,
        paginateQuery: { itemsPerPage, page }
      })
      reply.statusCode = 200
      return response
    }
  })
}
