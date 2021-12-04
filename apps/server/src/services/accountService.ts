import * as bcrypt from 'bcryptjs'

import type { User } from '../generatedTypes'
import type { AuthCredentials } from '../types/accountTypes'
import { prisma } from '../prismaClient'

const { genSalt, hash } = bcrypt

export async function createUser({
	emailAddress,
	password
}: AuthCredentials): Promise<User> {
	// TODO: Error Handling
	const salt = await genSalt(15)
	const hashedPassword = await hash(password, salt)

	const user = await prisma.user.create({
		data: {
			emailAddress,
			password: hashedPassword
		}
	})

	const userProfile = await prisma.userProfile.create({
		data: {
			userId: user.id
		}
	})

	return {
		id: user.id,
		emailAddress: user.emailAddress,
		isEmailAddressVerified: user.isEmailAddressVerified,
		createdAt: user.createdAt.toString(),
		profile: {
			id: userProfile.id,
			createdAt: userProfile.createdAt.toString(),
			subscriptions: []
		}
	}
}
