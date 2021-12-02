import type { Resolvers } from './generatedTypes'
import { registerUser } from './accounts/register'
import { authenticateUser } from './accounts/authenticate'

export const resolvers: Resolvers = {
	Query: {
		getSubscriptions: async (_root, { userProfileId }, ctx) => {
			return await ctx.prisma.subscription.findMany({
				where: {
					userProfileId
				},
				include: {
					playedEpisodes: true
				}
			})
		}
	},
	Mutation: {
		registerUser: async (_root, { emailAddress, password }, { prisma }) => {
			return await registerUser(prisma, emailAddress, password)
		},
		authenticateUser: async (_root, { emailAddress, password }, { prisma }) => {
			return await authenticateUser(prisma, emailAddress, password)
		}
	}
}
