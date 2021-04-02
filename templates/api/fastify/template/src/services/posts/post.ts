import { FastifyPluginAsync, FastifySchema } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

import Post, { postSchema } from '../../models/Post'

const bodyPostsSchema = Type.Object({
  title: Type.String(),
  description: Type.String()
})

type BodyPostsSchemaType = Static<typeof bodyPostsSchema>

const postsPostsSchema: FastifySchema = {
  description: 'Create a new post',
  tags: ['posts'] as string[],
  body: bodyPostsSchema,
  response: {
    201: postSchema
  }
} as const

export const postPosts: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Body: BodyPostsSchemaType }>({
    method: 'POST',
    url: '/posts',
    schema: postsPostsSchema,
    handler: async (request, reply) => {
      const { description, title } = request.body
      const post = await Post.create({ description, title })
      fastify.io.emit('posts', { action: 'create', item: post })
      reply.statusCode = 201
      return post
    }
  })
}
