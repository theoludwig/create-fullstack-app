import { FastifyPluginAsync } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const HelloSchema = Type.Object({
  hello: Type.String()
})

type HelloSchemaType = Static<typeof HelloSchema>

const getHelloSchema = {
  description: 'Hello world!',
  response: {
    200: HelloSchema
  }
} as const

export const getHello: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/hello',
    schema: getHelloSchema,
    handler: async (_request, reply) => {
      const response: HelloSchemaType = {
        hello: 'world'
      }
      reply.statusCode = 200
      return response
    }
  })
}
