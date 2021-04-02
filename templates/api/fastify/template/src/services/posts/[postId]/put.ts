import { FastifyPluginAsync, FastifySchema } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

import Post, { postSchema } from '../../../models/Post'

const bodyPostsSchema = Type.Object({
  title: Type.Optional(Type.String()),
  description: Type.Optional(Type.String())
})

type BodyPostsSchemaType = Static<typeof bodyPostsSchema>

const paramsPostsSchema = Type.Object({
  postId: Type.Integer()
})

type ParamsPostsSchemaType = Static<typeof paramsPostsSchema>

const putPostsSchema: FastifySchema = {
  description: 'Update a post by its id',
  tags: ['posts'] as string[],
  body: bodyPostsSchema,
  params: paramsPostsSchema,
  response: {
    200: postSchema
  }
} as const

export const putPostById: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Body: BodyPostsSchemaType, Params: ParamsPostsSchemaType }>({
    method: 'PUT',
    url: '/posts/:postId',
    schema: putPostsSchema,
    handler: async (request, reply) => {
      const { title, description } = request.body
      const { postId } = request.params
      const post = await Post.findOne({ where: { id: postId } })
      if (post == null) {
        throw fastify.httpErrors.notFound()
      }
      post.title = title ?? post.title
      post.description = description ?? post.description
      await post.save()
      fastify.io.emit('posts', { action: 'update', item: post })
      reply.statusCode = 200
      return post
    }
  })
}
