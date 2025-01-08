import { useState, useEffect, useContext } from 'react'
import { AxiosResponse } from 'axios'
import { IUserCredentials } from '../../../../../utils/types/user.interface'
import { IPrevision } from '../../../../../utils/types/prevision.interface'
import { UserContext } from '../../../../../context/userContext'
import { IServerPrevision, previsionModel } from '../../../../../API/models/prevision.model'
import { postRequest } from '../../../../../API/APICalls'
import { useNavigate, useParams } from 'react-router-dom'
import './ModifyTiersPage.scss'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button'
import mockTiersData from './mock/mockTiersData'

const ModifyTiersPage: React.FC = () => {
	const navigate = useNavigate()
	const { userCredentials } = useContext(UserContext)
	const { tiersId } = useParams<{ tiersId: string }>() // Récupère l'ID du tiers depuis l'URL
	const [activeTab, setActiveTab] = useState('coordonnees') // Onglet actif
	const [tiersData, setTiersData] = useState(mockTiersData) // Données initiales venant du mock
	const [isLoading, setIsLoading] = useState(false)

	// useEffect(() => {
	// 	// Simulez une récupération des données avec l'ID du tiers
	// 	console.log(`Chargement des données pour le tiers : ${tiersId}`)
	// 	// Fonction pour récupérer les détails d'un fournisseur par code fournisseur
	// 	const getDetailsFournisseurService = async (
	// 		userCredentials: IUserCredentials,
	// 		code: string
	// 	): Promise<IPrevision[] | string> => {
	// 		const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
	// 		const reqBody = {
	// 			userID: userCredentials.matricule,
	// 			password: userCredentials.password,
	// 			request: 'read_list_data_fournisseurs',
	// 			args: { userCredentials, code_tiers: code },
	// 			test: true,
	// 		}

	// 		try {
	// 			const res = (await postRequest(endpoint, reqBody)) as AxiosResponse<{ data: { rows: IServerPrevision[] } }>

	// 			const rows = res.data?.data?.rows
	// 			if (!rows || rows.length === 0) {
	// 				console.error('Aucune donnée trouvée.')
	// 				return 'Aucune donnée trouvée.'
	// 			}

	// 			return rows.map((prevision: IServerPrevision) => previsionModel(prevision))
	// 		} catch (error) {
	// 			console.error('Erreur API détectée :', error)
	// 			return "Une erreur inattendue s'est produite."
	// 		}
	// 	}
	// }, [tiersId])

	// // Pour simuler un futur appel API
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		setIsLoading(true)
	// 		// Remplacez cette simulation par un appel API réel quand il sera prêt
	// 		setTimeout(() => {
	// 			setTiersData(mockTiersData)
	// 			setIsLoading(false)
	// 		}, 1000)
	// 	}

	// 	fetchData()
	// }, [])

	useEffect(() => {
		const getDetailsFournisseurService = async (
			userCredentials: IUserCredentials,
			code: string
		): Promise<IPrevision[] | string> => {
			const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
			const reqBody = {
				userID: userCredentials.matricule,
				password: userCredentials.password,
				request: 'read_list_data_fournisseurs',
				args: { code_tiers: code },
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

		const fetchTiersDetails = async () => {
			if (!userCredentials || !tiersId) {
				console.error('Identifiants utilisateur ou code tiers manquant.')
				return
			}
			setIsLoading(true)
			try {
				const data = await getDetailsFournisseurService(userCredentials, tiersId)
				if (typeof data === 'string') {
					console.error(data)
					alert(data)
				} else {
					console.log('Données récupérées via API :', data)
					// Met à jour les données du fournisseur
					setTiersData(data[0]) // En supposant que `data` contient un tableau d'objets de fournisseur
				}
			} catch (error) {
				console.error('Erreur lors de la récupération des données du fournisseur :', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchTiersDetails()
	}, [tiersId, userCredentials])
	const handleTabChange = (tab: string) => {
		setActiveTab(tab)
	}

	const handleSave = () => {
		// Pour une future intégration API : remplacer le log par un appel POST/PUT
		console.log('Données enregistrées :', tiersData)
		alert('Modifications enregistrées')
	}

	const handleDelete = () => {
		// Pour une future intégration API : remplacer le log par un appel DELETE
		console.log('Fournisseur supprimé :', tiersData.header)
		alert('Fournisseur supprimé')
	}

	const handleCancel = () => {
		// Réinitialiser les données à celles du mock ou d'une source API
		setTiersData(mockTiersData)
		navigate(-1)
	}

	if (isLoading) {
		return <p>Chargement des données...</p>
	}

	const { coordonnees, compta, treso } = tiersData

	return (
		<div className='modify-tiers-page'>
			<Header props={{ pageURL: `GIVOO | MODIFICATION FOURNISSEUR : ${tiersData.header.nomTiers}` }} />

			<main>
				<div className='tabs-container'>
					{/* Onglets */}
					<button
						className={`tab ${activeTab === 'coordonnees' ? 'active' : ''}`}
						onClick={() => handleTabChange('coordonnees')}
					>
						Coordonnées
					</button>
					<button className={`tab ${activeTab === 'compta' ? 'active' : ''}`} onClick={() => handleTabChange('compta')}>
						Compta
					</button>
					<button className={`tab ${activeTab === 'treso' ? 'active' : ''}`} onClick={() => handleTabChange('treso')}>
						Trésorerie
					</button>
				</div>

				<div className='tab-content'>
					{/* Contenu des onglets */}
					{activeTab === 'coordonnees' && (
						<div className='tab-panel'>
							<h2>Coordonnées</h2>
							<div className='form-container'>
								<label>
									Société :
									<input
										type='text'
										value={coordonnees.societe}
										onChange={(e) =>
											setTiersData({ ...tiersData, coordonnees: { ...coordonnees, societe: e.target.value } })
										}
									/>
								</label>
								<label>
									Activité :
									<input
										type='text'
										value={coordonnees.activite}
										onChange={(e) =>
											setTiersData({ ...tiersData, coordonnees: { ...coordonnees, activite: e.target.value } })
										}
									/>
								</label>
								<label>
									Rubrique :
									<input
										type='text'
										value={coordonnees.rubrique}
										onChange={(e) =>
											setTiersData({ ...tiersData, coordonnees: { ...coordonnees, rubrique: e.target.value } })
										}
									/>
								</label>
								<label>
									SIRET :
									<input
										type='text'
										value={coordonnees.siret}
										onChange={(e) =>
											setTiersData({ ...tiersData, coordonnees: { ...coordonnees, siret: e.target.value } })
										}
									/>
								</label>
								{/* Ajoutez d'autres champs en fonction des besoins */}
							</div>
						</div>
					)}

					{activeTab === 'compta' && (
						<div className='tab-panel'>
							<h2>Compta</h2>
							<div className='form-container'>
								<label>
									N° Compte Général :
									<input
										type='text'
										value={compta.compteGeneral}
										onChange={(e) =>
											setTiersData({ ...tiersData, compta: { ...compta, compteGeneral: e.target.value } })
										}
									/>
								</label>
								<label>
									N° Compte Charge :
									<input
										type='text'
										value={compta.compteCharge}
										onChange={(e) =>
											setTiersData({ ...tiersData, compta: { ...compta, compteCharge: e.target.value } })
										}
									/>
								</label>
								<label>
									Assujetti TVA :
									<select
										value={compta.assujettiTVA}
										onChange={(e) =>
											setTiersData({ ...tiersData, compta: { ...compta, assujettiTVA: e.target.value } })
										}
									>
										<option value='Non'>Non</option>
										<option value='Oui'>Oui</option>
									</select>
								</label>
								{/* Ajoutez d'autres champs */}
							</div>
						</div>
					)}

					{activeTab === 'treso' && (
						<div className='tab-panel'>
							<h2>Trésorerie</h2>
							<div className='form-container'>
								<label>
									Mode de Paiement :
									<select
										value={treso.modePaiement}
										onChange={(e) => setTiersData({ ...tiersData, treso: { ...treso, modePaiement: e.target.value } })}
									>
										<option value='Prélèvement'>Prélèvement</option>
										<option value='Virement'>Virement</option>
									</select>
								</label>
								<label>
									Banque Enregistrée :
									<select
										value={treso.banqueEnregistre}
										onChange={(e) =>
											setTiersData({ ...tiersData, treso: { ...treso, banqueEnregistre: e.target.value } })
										}
									>
										<option value='Aucune'>Aucune</option>
										<option value='Société Générale'>Société Générale</option>
									</select>
								</label>
								<label>
									Récurrent :
									<select
										value={treso.recurrent}
										onChange={(e) => setTiersData({ ...tiersData, treso: { ...treso, recurrent: e.target.value } })}
									>
										<option value='Non'>Non</option>
										<option value='Oui'>Oui</option>
									</select>
								</label>
							</div>
						</div>
					)}
				</div>

				<div className='buttons-container'>
					<Button props={{ style: 'blue', text: 'Ok', type: 'button', onClick: handleSave }} />
					<Button props={{ style: 'grey', text: 'Annuler', type: 'button', onClick: handleCancel }} />
					<Button props={{ style: 'red', text: 'Supprimer', type: 'button', onClick: handleDelete }} />
				</div>
			</main>
		</div>
	)
}

export default ModifyTiersPage
