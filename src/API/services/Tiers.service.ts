// utils
import { isOnProduction } from '../../utils/scripts/utils.ts'

// types

import { AxiosResponse } from 'axios'
import { IUserCredentials } from '../../utils/types/user.interface.ts'
import { IServerTiersPrevisions, tiersPrevisionsModel } from '../models/tiers.model.ts'
import { ITiersPrevisions } from '../../utils/types/tiers.interface.ts'

// API
import { postRequest } from '../APICalls.ts'

export const getTiersPrevisionsServices = async (
	userCredentials: IUserCredentials,
	refSourceTiers: string
): Promise<ITiersPrevisions[] | string> => {
	const endpoint: string = isOnProduction ? 'mdr' : '/tresorerie/getPrevisionsTiers.php'

	const data = {
		userCredentials,
		ref_source_tiers: refSourceTiers,
	}

	console.log('data ->', data)

	const res: AxiosResponse | { errorMessage: string } = await postRequest(endpoint, data)

	if ('errorMessage' in res) {
		console.error(new Error(res.errorMessage))
		switch (res.errorMessage) {
			case 'Invalid credentials':
				return 'Identifiants ou mot de passe incorrects'
			case 'User not found':
				return 'Utilisateur non trouvé.'
			default:
				return "Une erreur inattendue c'est produite."
		}
	}

	return res.data.map((tiersPrevisions: IServerTiersPrevisions): ITiersPrevisions => {
		return tiersPrevisionsModel(tiersPrevisions)
	})
}
