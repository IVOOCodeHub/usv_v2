import { useState, useEffect, useContext } from 'react'
import { AxiosResponse } from 'axios'
import { IUserCredentials } from '../../../../../utils/types/user.interface'
import { UserContext } from '../../../../../context/userContext'
import { postRequest } from '../../../../../API/APICalls'
import { useNavigate, useParams } from 'react-router-dom'
import './ModifyTiersPage.scss'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button'

const ModifyTiersPage: React.FC = () => {
	const navigate = useNavigate()
	const { userCredentials } = useContext(UserContext)
	const { tiersId } = useParams<{ tiersId: string }>() // Récupère l'ID du tiers depuis l'URL
	const [activeTab, setActiveTab] = useState('coordonnees') // Onglet actif
	const [tiersData, setTiersData] = useState<any | null>(null) // Données initiales
	const [isLoading, setIsLoading] = useState(false)

	// Fonction pour récupérer les détails du fournisseur
	const getDetailsFournisseurService = async (userCredentials: IUserCredentials, code: string) => {
		const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
		const reqBody = {
			userID: userCredentials.matricule,
			password: userCredentials.password,
			request: 'read_list_data_fournisseurs',
			args: { code },
			test: true,
		}

		try {
			const res = (await postRequest(endpoint, reqBody)) as AxiosResponse<{ data: { data: { rows: any } } }>
			console.log("Réponse complète de l'API :", res)

			const data = res.data?.data?.rows
			if (!data || typeof data !== 'object') {
				console.error('Aucune donnée disponible pour ce fournisseur.')
				return null
			}

			return data
		} catch (error) {
			console.error('Erreur API détectée :', error)
			return null
		}
	}

	// Chargement des détails du tiers
	useEffect(() => {
		const fetchTiersDetails = async () => {
			if (!userCredentials || !tiersId) {
				console.error('Identifiants utilisateur ou code tiers manquant.')
				return
			}
			setIsLoading(true)
			try {
				const data = await getDetailsFournisseurService(userCredentials, tiersId)
				if (!data) {
					console.error('Aucune donnée trouvée pour ce fournisseur.')
				} else {
					console.log('Données récupérées via API :', data)
					setTiersData(data) // Mettre à jour les données pour les champs
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
		console.log('Données enregistrées :', tiersData)
		alert('Modifications enregistrées')
	}

	const handleCancel = () => {
		setTiersData(null)
		navigate(-1)
	}

	if (isLoading) {
		return <p>Chargement des données...</p>
	}

	if (!tiersData) {
		return <p>Aucune donnée disponible pour ce fournisseur.</p>
	}

	const {
		societe,
		activite,
		rubrique_tresorerie,
		siret,
		no_compte_general,
		no_compte_charge,
		mode_paiement,
		banque_beneficiaire,
	} = tiersData

	return (
		<div className='modify-tiers-page'>
			<Header props={{ pageURL: `GIVOO | MODIFICATION FOURNISSEUR : ${societe}` }} />

			<main>
				<div className='tabs-container'>
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
					{/* Coordonnées */}
					{activeTab === 'coordonnees' && (
						<div className='tab-panel'>
							<h2>Coordonnées</h2>
							<label>
								Société :
								<input
									type='text'
									value={societe || ''}
									onChange={(e) => setTiersData({ ...tiersData, societe: e.target.value })}
								/>
							</label>
							<label>
								Activité :
								<input
									type='text'
									value={activite || ''}
									onChange={(e) => setTiersData({ ...tiersData, activite: e.target.value })}
								/>
							</label>
							<label>
								Rubrique :
								<input
									type='text'
									value={rubrique_tresorerie || ''}
									onChange={(e) => setTiersData({ ...tiersData, rubrique_tresorerie: e.target.value })}
								/>
							</label>
							<label>
								SIRET :
								<input
									type='text'
									value={siret || ''}
									onChange={(e) => setTiersData({ ...tiersData, siret: e.target.value })}
								/>
							</label>
						</div>
					)}

					{/* Compta */}
					{activeTab === 'compta' && (
						<div className='tab-panel'>
							<h2>Compta</h2>
							<label>
								N° Compte Général :
								<input
									type='text'
									value={no_compte_general || ''}
									onChange={(e) => setTiersData({ ...tiersData, no_compte_general: e.target.value })}
								/>
							</label>
							<label>
								N° Compte Charge :
								<input
									type='text'
									value={no_compte_charge || ''}
									onChange={(e) => setTiersData({ ...tiersData, no_compte_charge: e.target.value })}
								/>
							</label>
						</div>
					)}

					{/* Trésorerie */}
					{activeTab === 'treso' && (
						<div className='tab-panel'>
							<h2>Trésorerie</h2>
							<label>
								Mode de Paiement :
								<input
									type='text'
									value={mode_paiement || ''}
									onChange={(e) => setTiersData({ ...tiersData, mode_paiement: e.target.value })}
								/>
							</label>
							<label>
								Banque Bénéficiaire :
								<input
									type='text'
									value={banque_beneficiaire || ''}
									onChange={(e) => setTiersData({ ...tiersData, banque_beneficiaire: e.target.value })}
								/>
							</label>
						</div>
					)}
				</div>

				<div className='buttons-container'>
					<Button props={{ style: 'blue', text: 'Ok', type: 'button', onClick: handleSave }} />
					<Button props={{ style: 'grey', text: 'Annuler', type: 'button', onClick: handleCancel }} />
				</div>
			</main>
		</div>
	)
}

export default ModifyTiersPage
