import Fastify from 'fastify'
import type { FastifyRequest, FastifyReply } from 'fastify'
import mercurius from 'mercurius'
import { getGraphQLSchema } from './getGraphQLSchema'
import { PrismaClient } from '@prisma/client'

const address = 3000
const fastify = Fastify()
const prisma = new PrismaClient()

const buildContext = async (_req: FastifyRequest, _reply: FastifyReply) => {
	return {
		prisma
	}
}

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
	interface MercuriusContext
		extends PromiseType<ReturnType<typeof buildContext>> {}
}

async function start() {
	const schema = await getGraphQLSchema()

	fastify.register(mercurius, {
		schema,
		graphiql: true,
		context: (_request, _reply) => {
			return { prisma }
		}
	})

	try {
		await fastify.listen(address, '0.0.0.0')
		console.log(`Server listening at ${address}`)
	} catch (e: unknown) {
		// TODO: properly type the error
		console.error(e)
		process.exit(1)
	}
}

start()
