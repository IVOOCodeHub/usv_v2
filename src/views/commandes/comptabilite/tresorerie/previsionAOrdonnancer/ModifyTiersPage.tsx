import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ModifyTiersPage.scss'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button'
import mockTiersData from './mock/mockTiersData'

const ModifyTiersPage: React.FC = () => {
	const navigate = useNavigate()
	const { tiersId } = useParams<{ tiersId: string }>() // Récupère l'ID du tiers depuis l'URL
	const [activeTab, setActiveTab] = useState('coordonnees') // Onglet actif
	const [tiersData, setTiersData] = useState(mockTiersData) // Données initiales venant du mock
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		// Simulez une récupération des données avec l'ID du tiers
		console.log(`Chargement des données pour le tiers : ${tiersId}`)
		// API à intégrer ici quand elle sera prête
	}, [tiersId])

	// Pour simuler un futur appel API
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			// Remplacez cette simulation par un appel API réel quand il sera prêt
			setTimeout(() => {
				setTiersData(mockTiersData)
				setIsLoading(false)
			}, 1000)
		}

		fetchData()
	}, [])

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
