// hooks | libraries
import { AxiosResponse } from 'axios'

// types
import { IUserCredentials } from '../../utils/types/user.interface.ts'
import { IServerPrevision, previsionModel } from '../models/prevision.model.ts'
import { IPrevision } from '../../utils/types/prevision.interface.ts'

// API
import { postRequest } from '../APICalls.ts'

export const getPrevisionOrdonnanceService = async (
	userCredentials: IUserCredentials,
	dateMin: string,
	dateMax: string
): Promise<IPrevision[] | string> => {
	const endpoint: string = 'http://192.168.0.112:8800/api/storedProcedure'

	const data = {
		userCredentials,
		date_min: dateMin,
		date_max: dateMax,
	}

	console.log('data –>', data)
	const reqBody = {
		userID: userCredentials.matricule,
		password: userCredentials.password,
		request: 'read_previsions_a_ordonnancer',
		args: data,
		test: true,
	}

	const res: AxiosResponse | { errorMessage: string } = await postRequest(endpoint, reqBody)

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

	return res.data['data']['rows'].map((prevision: IServerPrevision): IPrevision => {
		return previsionModel(prevision)
	})
}

// fonction pour récupérer les détails d'une prévision

// export const getPrevisionDetailsService = async (
// 	userCredentials: IUserCredentials,
// 	clePrevision: string
// ): Promise<IPrevision | string> => {
// 	const endpoint: string = 'http://192.168.0.112:8800/api/storedProcedure'

// 	const data = {
// 		userCredentials,
// 		cle_prevision: clePrevision,
// 	}

// 	console.log('détails reçus depuis nouvelle procédure:', data)

// 	const reqBody = {
// 		userID: userCredentials.matricule,
// 		password: userCredentials.password,
// 		request: 'read_only_one_prevision_a_ordonnancer',
// 		args: data,
// 		test: true,
// 	}

// 	const res: AxiosResponse | { errorMessage: string } = await postRequest(endpoint, reqBody)

// 	if ('errorMessage' in res) {
// 		console.error(new Error(res.errorMessage))
// 		switch (res.errorMessage) {
// 			case 'Invalid credentials':
// 				return 'Identifiants ou mot de passe incorrects'
// 			case 'User not found':
// 				return 'Utilisateur non trouvé.'
// 			default:
// 				return "Une erreur inattendue s'est produite."
// 		}
// 	}

// 	if (!res.data['data']['rows'] || res.data['data']['rows'].length === 0) {
// 		return 'Aucune prévision trouvée pour cette clé.'
// 	}

// 	// Mapper les données pour les structurer correctement
// 	return previsionModel(res.data['data']['rows'][0])
// }

export const getPrevisionDetailsService = async (
	userCredentials: IUserCredentials,
	cle: string
): Promise<IPrevision | string> => {
	const endpoint: string = 'http://192.168.0.112:8800/api/storedProcedure'

	const data = {
		userCredentials,
		cle, // Clé de la prévision
	}

	const reqBody = {
		userID: userCredentials.matricule,
		password: userCredentials.password,
		request: 'read_only_one_prevision_a_ordonnancer', // Nom de la procédure stockée
		args: data,
		test: true,
	}

	const res: AxiosResponse | { errorMessage: string } = await postRequest(endpoint, reqBody)

	console.log("Réponse brute de l'API :", res) // Log de la réponse brute

	if ('errorMessage' in res) {
		console.error(new Error(res.errorMessage))
		return `Erreur API : ${res.errorMessage}`
	}

	// Vérifiez si 'data', 'data.rows' existent dans la réponse
	if (!res.data || !res.data['data']) {
		console.error('Structure inattendue dans la réponse API :', res.data)
		return 'Erreur lors de la récupération des données.'
	}

	// Si 'rows' n'existe pas, retournez les données directement
	const prevision: IServerPrevision = Array.isArray(res.data['data'])
		? res.data['data'][0] // Si c'est un tableau
		: res.data['data'] // Si c'est un objet unique
	return previsionModel(prevision)
}
