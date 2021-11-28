const subscriptions = [
	{
		id: 1,
		createdAt: new Date().toString(),
		updatedAt: null,
		feedUrl: 'https://syntax.fm',
		playedEpisodes: []!
	}
]
export const resolvers = {
	Query: {
		getSubscriptions: (_root: any, _args: any, _ctx: any) => {
			return subscriptions
		}
	}
}
