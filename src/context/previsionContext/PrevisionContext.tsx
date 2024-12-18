import { createContext } from 'react'
import { IUserCredentials } from '../../utils/types/user.interface'

export const PrevisionContext = createContext({
	previsions: null,
	setPrevisions: (): void => {},
	getPrevisionOrdonance: async ({ userCredentials: IUserCredentials, dateEcheance: string }): Promise<void> => {},
})
