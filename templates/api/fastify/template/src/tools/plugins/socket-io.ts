import fastifyPlugin from 'fastify-plugin'
import { Server as SocketIoServer, ServerOptions } from 'socket.io'

declare module 'fastify' {
  export interface FastifyInstance {
    io: SocketIoServer
  }
}

export default fastifyPlugin(
  async (fastify, options: Partial<ServerOptions>) => {
    const socket = new SocketIoServer(fastify.server, options)
    fastify.decorate('io', socket)
    fastify.addHook('onClose', async (fastify) => {
      fastify.io.close()
    })
  },
  { fastify: '3.x' }
)
