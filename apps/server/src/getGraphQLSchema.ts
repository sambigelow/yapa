import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import { resolvers } from './resolvers'

export async function getGraphQLSchema(): Promise<GraphQLSchema> {
	const typeDefs = await loadSchema('./src/schema.graphql', {
		loaders: [new GraphQLFileLoader()]
	})

	return makeExecutableSchema({
		typeDefs,
		resolvers
	})
}
