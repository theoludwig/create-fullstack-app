import { FastifyPluginAsync, FastifySchema } from 'fastify'

import prisma from '../../tools/database/prisma'
import {
  bodyPostSchema,
  BodyPostSchemaType,
  postSchema
} from '../../models/Post'
import { fastifyErrors } from '../../models/utils'

const postsPostsSchema: FastifySchema = {
  description: 'Create a new post',
  tags: ['posts'] as string[],
  body: bodyPostSchema,
  response: {
    201: postSchema,
    400: fastifyErrors[400],
    404: fastifyErrors[404],
    500: fastifyErrors[500]
  }
} as const

export const postPosts: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Body: BodyPostSchemaType }>({
    method: 'POST',
    url: '/posts',
    schema: postsPostsSchema,
    handler: async (request, reply) => {
      const { title, content } = request.body
      const post = await prisma.post.create({ data: { content, title } })
      fastify.io.emit('posts', { action: 'create', item: post })
      reply.statusCode = 201
      return post
    }
  })
}
