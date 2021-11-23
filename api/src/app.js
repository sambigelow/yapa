import Fastify from 'fastify'
import mercurius from 'mercurius'
import prismaClient from '@prisma/client'

const fastify = Fastify({ logger: true })
const prisma = new prismaClient.PrismaClient()

const schema = `
  type Subscription {
    id: ID!
    createdAt: String!
    updatedAt: String
    feedUrl: String!
    playedEpisodes: [PlayedEpisode]!
  }

  type PlayedEpisode {
    id: ID!
    createdAt: String!
    updatedAt: String
    episodeGuid: String!
  }

  type Query {
    add(x: Int, y: Int): Int
    subscriptions: [Subscription]!
  }
`

const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y,
    subscriptions: async (_request, _reply, ctx) => {
      return await ctx.prisma.subscription.findMany({
        include: {
          playedEpisodes: true
        }
      })
    }
  }
}

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
  context: (request, reply) => {
    return { prisma }
  }
})

fastify.post('/api/graphql', async (request, reply) => {
  console.log({ request })
  reply.send(200)
})

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
