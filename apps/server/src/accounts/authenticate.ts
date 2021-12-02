import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const { compare } = bcrypt

export const authenticateUser = async (
	prisma: PrismaClient,
	emailAddress: string,
	password: string
): Promise<boolean> => {
	const user = await prisma.user.findUnique({
		where: {
			emailAddress
		}
	})

	if (user) {
		const isAuthenticated = await compare(password, user.password)
		return isAuthenticated
	} else {
		return false
	}
}
