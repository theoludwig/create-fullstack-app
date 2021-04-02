import fastify from 'fastify'
import fastifySocketIo from '../socket-io'

describe('tools/plugins/socket-io', () => {
  it('should close socket server on fastify close', async () => {
    const PORT = 3030
    const application = fastify()
    await application.register(fastifySocketIo)
    await application.listen(PORT)
    expect(application.io).not.toBeNull()
    await application.close()
  })
})
