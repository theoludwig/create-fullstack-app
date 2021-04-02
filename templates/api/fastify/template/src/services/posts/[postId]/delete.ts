import { FastifyPluginAsync, FastifySchema } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

import Post, { postSchema } from '../../../models/Post'

const paramsPostsSchema = Type.Object({
  postId: Type.Integer()
})

type ParamsPostsSchemaType = Static<typeof paramsPostsSchema>

const deletePostsSchema: FastifySchema = {
  description: 'Delete a post by its id',
  tags: ['posts'] as string[],
  params: paramsPostsSchema,
  response: {
    200: postSchema
  }
} as const

export const deletePostById: FastifyPluginAsync = async (fastify) => {
  fastify.route<{ Params: ParamsPostsSchemaType }>({
    method: 'DELETE',
    url: '/posts/:postId',
    schema: deletePostsSchema,
    handler: async (request, reply) => {
      const { postId } = request.params
      const post = await Post.findOne({ where: { id: postId } })
      if (post == null) {
        throw fastify.httpErrors.notFound()
      }
      await post.destroy()
      fastify.io.emit('posts', { action: 'delete', item: post })
      reply.statusCode = 200
      return post
    }
  })
}
