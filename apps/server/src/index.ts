import Fastify from 'fastify'
import mercurius from 'mercurius'
import { getGraphQLSchema } from './getGraphQLSchema'

const address = 3000
const fastify = Fastify()

async function start() {
	const schema = await getGraphQLSchema()

	fastify.register(mercurius, {
		schema,
		graphiql: true
	})

	try {
		await fastify.listen(address)
		console.log(`Server listening at ${address}`)
	} catch (e: unknown) {
		// TODO: properly type the error
		console.error(e)
		process.exit(1)
	}
}

start()
