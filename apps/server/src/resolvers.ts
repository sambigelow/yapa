import type { Resolvers, QueryGetSubscriptionsArgs } from './resolvers-types'

const subscriptions = [
	{
		id: 1,
		createdAt: new Date().toString(),
		updatedAt: null,
		feedUrl: 'https://syntax.fm',
		playedEpisodes: []!
	}
]
export const resolvers: Resolvers = {
	Query: {
		getSubscriptions: (_root, _args, _ctx) => {
			return subscriptions
		}
	}
}
