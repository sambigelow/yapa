import { Resolvers } from '../generatedTypes'
import * as accountMutations from './accountMutations'
import * as accountQueries from './accountQueries'

export const resolvers: Resolvers = {
	Mutation: {
		...accountMutations
	},
	Query: {
		...accountQueries
	}
}
