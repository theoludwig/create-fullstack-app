import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

import { postSchema } from '../../models/Post'
import { fastifyErrors } from '../../models/utils'
import {
  getPaginationOptions,
  PaginationQuery,
  paginationQuerySchema
} from '../../tools/database/pagination'
import prisma from '../../tools/database/prisma'

const paginatePostSchema = Type.Array(postSchema)

const getPostsSchema: FastifySchema = {
  description: 'GET all the posts',
  tags: ['posts'] as string[],
  querystring: paginationQuerySchema,
  response: {
    200: paginatePostSchema,
    404: fastifyErrors[404],
    500: fastifyErrors[500]
  }
} as const

export const getPosts: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Querystring: PaginationQuery }>({
    method: 'GET',
    url: '/posts',
    schema: getPostsSchema,
    handler: async (request, reply) => {
      const posts = await prisma.post.findMany({
        ...getPaginationOptions(request.query)
      })
      reply.statusCode = 200
      return posts
    }
  })
}
