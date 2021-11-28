import * as bcrypt from 'bcryptjs'
import type { PrismaClient } from '@prisma/client'
import type { User } from '../generatedTypes'

const { genSalt, hash } = bcrypt

/**
 *
 * @param {PrismaClient} prisma
 * @param {string} emailAddress
 * @param {string} password The plaintext password
 */
export async function registerUser(
	prisma: PrismaClient,
	emailAddress: string,
	password: string
): Promise<User> {
	const salt = await genSalt(16)
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
		emailAddress: user.emailAddress,
		isEmailAddressVerified: false,
		id: user.id,
		createdAt: user.createdAt.toString(),
		profile: {
			id: userProfile.id,
			createdAt: userProfile.createdAt.toString(),
			subscriptions: []
		}
	}
}
