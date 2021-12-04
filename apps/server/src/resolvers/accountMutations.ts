import type { User } from '../generatedTypes'
import type { MutationRegisterUserArgs } from '../generatedTypes'
import { createUser } from '../services/accountService'

export const registerUser = async (
	_root: unknown,
	{ emailAddress, password }: MutationRegisterUserArgs
): Promise<User> => {
	return await createUser({ emailAddress, password })
}

// export const authenticateUser = async()
