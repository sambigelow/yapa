import type { Resolvers } from './generatedTypes'
import { registerUser } from './registration/register'

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
		registerUser: async (_root, { emailAddress, password }, ctx) => {
			return await registerUser(ctx.prisma, emailAddress, password)
		}
	}
}
