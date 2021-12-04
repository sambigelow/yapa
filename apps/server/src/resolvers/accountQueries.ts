import { UserProfile } from '@prisma/client'
import { Maybe } from 'graphql/jsutils/Maybe'
import type { User } from '../generatedTypes'
import { prisma } from '../prismaClient'

const emptyObj = {}
Object.freeze(emptyObj)

export const users = async (): Promise<User[]> => {
	const users = await prisma.user.findMany({
		where: {
			profile: {
				isNot: null
			}
		},
		include: {
			profile: {
				include: {
					subscriptions: {
						include: { playedEpisodes: true }
					}
				}
			}
		}
	})

	return users.map((u) => {
		return {
			...getBasics(u),
			emailAddress: u.emailAddress,
			isEmailAddressVerified: u.isEmailAddressVerified,
			profile: {
				...getBasics(u.profile as UserProfile),
				subscriptions:
					u.profile?.subscriptions.map((sub) => {
						return {
							...getBasics(sub),
							feedUrl: sub.feedUrl,
							playedEpisodes:
								sub?.playedEpisodes.map((pe) => {
									return {
										...getBasics(pe),
										episodeGuid: pe.episodeGuid
									}
								}) || []
						}
					}) || []
			}
		}
	})
}

interface DbObject {
	id: string
	createdAt: Date
	updatedAt: Maybe<Date>
}

function getBasics(obj: DbObject) {
	return {
		id: obj.id,
		createdAt: obj.createdAt.toString(),
		updatedAt: obj?.updatedAt?.toString() || null
	}
}
