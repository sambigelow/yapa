import Fastify from 'fastify'
import prismaPlugin from './plugins/prismaPlugin.js'

const fastify = Fastify({ logger: true })

fastify.register(prismaPlugin)

// Declare a route
fastify.get('/api/subscriptions', async (request, reply) => {
  const subscriptions = await fastify.prisma.subscription.findMany({
    include: {
      playedEpisodes: true
    }
  })
  return subscriptions
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
