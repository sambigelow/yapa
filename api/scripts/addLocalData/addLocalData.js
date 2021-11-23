import prismaClient from '@prisma/client'

const prisma = new prismaClient.PrismaClient()

;(async () => {
  await prisma.subscription.create({
    data: {
      feedUrl: 'https://feed.syntax.fm/rss',
      playedEpisodes: {
        create: [
          { episodeGuid: '3af4c9e0-9e4f-45bb-bb18-7d76ea688d88' },
          { episodeGuid: '4632863f-6edf-40d9-962f-66c25fd083ab' }
        ]
      }
    }
  })

  await prisma.subscription.create({
    data: { feedUrl: 'https://shoptalkshow.com/feed/podcast/' }
  })
})()
