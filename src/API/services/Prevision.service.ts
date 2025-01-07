import { AxiosResponse } from 'axios'
import { IUserCredentials } from '../../utils/types/user.interface.ts'
import { IServerPrevision, previsionModel } from '../models/prevision.model.ts'
import { IPrevision } from '../../utils/types/prevision.interface.ts'
import { postRequest } from '../APICalls.ts'

interface ApiResponse {
	data: {
		data: {
			data: {
				prevision: IServerPrevision
				courrier?: {
					courrier?: {
						nom_fichier?: string
						nature?: string
						action?: string
						commentaire?: string
					} | null
				} | null
			}
		}
	}
}

// Fonction pour récupérer les prévisions à ordonnancer
export const getPrevisionOrdonnanceService = async (
	userCredentials: IUserCredentials,
	dateMin: string,
	dateMax: string
): Promise<IPrevision[] | string> => {
	const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
	const reqBody = {
		userID: userCredentials.matricule,
		password: userCredentials.password,
		request: 'read_previsions_a_ordonnancer',
		args: { userCredentials, date_min: dateMin, date_max: dateMax },
		test: true,
	}

	try {
		const res = (await postRequest(endpoint, reqBody)) as AxiosResponse<{ data: { rows: IServerPrevision[] } }>

		const rows = res.data?.data?.rows
		if (!rows || rows.length === 0) {
			console.error('Aucune donnée trouvée.')
			return 'Aucune donnée trouvée.'
		}

		return rows.map((prevision: IServerPrevision) => previsionModel(prevision))
	} catch (error) {
		console.error('Erreur API détectée :', error)
		return "Une erreur inattendue s'est produite."
	}
}

// Fonction pour récupérer les détails d'une prévision
export const getPrevisionDetailsService = async (
	userCredentials: IUserCredentials,
	previsionCode: string
): Promise<
	| {
			prevision: IPrevision
			courrier?: {
				nom_fichier?: string
				nature?: string
				action?: string
				commentaire?: string
			} | null
	  }
	| string
> => {
	const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
	const reqBody = {
		userID: userCredentials.matricule,
		password: userCredentials.password,
		request: 'read_only_one_prevision_a_ordonnancer',
		args: { userCredentials, cle_prevision: previsionCode },
		test: true,
	}

	try {
		const res = (await postRequest(endpoint, reqBody)) as AxiosResponse<ApiResponse>

		console.log('Réponse brute de l’API :', res)

		// Extraction sécurisée des données
		// const prevision = res.data?.data?.data?.data?.prevision || null
		const prevision: IServerPrevision = res.data?.data?.data?.data?.prevision
		const courrier = res.data?.data?.data?.courrier?.courrier || null

		console.log('Avant transformation :', prevision)
		console.log('Après transformation :', previsionModel(prevision))
		// Vérification des données extraites
		if (!prevision) {
			console.error('Aucune prévision trouvée dans la réponse.')
			return 'Aucune donnée trouvée.'
		}

		console.log('Détails de la prévision :', prevision)
		console.log('Courrier associé :', courrier)

		const transformedPrevision = previsionModel(prevision)

		return { prevision: transformedPrevision, courrier }
	} catch (error) {
		console.error('Erreur lors de la récupération des détails :', error)
		return 'Erreur lors de la récupération des données.'
	}
}

// Fonction pour récupérer les détails de prévisions d'un tiers

// Fonction pour récupérer le budget
export const getBudgetService = async (userCredentials: IUserCredentials, refSourceTiers: string) => {
	const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
	const reqBody = {
		userID: userCredentials.matricule,
		password: userCredentials.password,
		request: 'read_list_budget_tiers',
		args: { userCredentials, refSourceTiers: refSourceTiers },
	}

	const res = await postRequest(endpoint, reqBody)
	console.log('res budget', res)

	return res.data.data.rows // Adapter selon la structure de réponse
}

// Fonction pour récupérer les prévisions
export const getPrevisionsService = async (userCredentials: IUserCredentials, refSourceTiers: string) => {
	const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
	const reqBody = {
		userID: userCredentials.matricule,
		password: userCredentials.password,
		request: 'read_list_previsions_tiers',
		args: { refSourceTiers },
	}

	const res = await postRequest(endpoint, reqBody)
	console.log('res previsions', res)
	return res.data.data.rows // Adapter selon la structure de réponse
}

// Fonction pour récupérer les paiements
export const getPaiementsService = async (userCredentials: IUserCredentials, refSourceTiers: string) => {
	const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
	const reqBody = {
		userID: userCredentials.matricule,
		password: userCredentials.password,
		request: 'read_list_paiements_tiers',
		args: { refSourceTiers },
	}

	const res = await postRequest(endpoint, reqBody)
	console.log('res paiements', res)
	return res.data.data.rows // Adapter selon la structure de réponse
}
