import './ModifyTiersPage.scss'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../../../context/userContext'
import { postRequest } from '../../../../../API/APICalls'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button'

const ModifyTiersPage: React.FC = () => {
	const navigate = useNavigate()
	const { userCredentials } = useContext(UserContext)
	const { tiersId } = useParams<{ tiersId: string }>()
	const [tiersData, setTiersData] = useState<any>({})
	const [activeTab, setActiveTab] = useState('coordonnees') // Onglet actif
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchTiersDetails = async () => {
			if (!userCredentials || !tiersId) {
				console.error('Identifiants utilisateur ou code tiers manquant.')
				return
			}
			setIsLoading(true)
			try {
				const endpoint = 'http://192.168.0.112:8800/api/storedProcedure'
				const reqBody = {
					userID: userCredentials.matricule,
					password: userCredentials.password,
					request: 'read_list_data_fournisseurs',
					args: { code: tiersId },
					test: true,
				}
				const res = await postRequest(endpoint, reqBody)
				setTiersData(res.data?.data?.rows || {})
			} catch (error) {
				console.error('Erreur lors de la récupération des données du fournisseur :', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchTiersDetails()
	}, [userCredentials, tiersId])

	const handleTabChange = (tab: string) => {
		setActiveTab(tab)
	}

	const handleSave = () => {
		console.log('Données enregistrées :', tiersData)
		alert('Modifications enregistrées')
	}

	const handleCancel = () => {
		navigate(-1)
	}

	const handleInputChange = (field: string, value: string) => {
		setTiersData({ ...tiersData, [field]: value })
	}

	if (isLoading) {
		return <p>Chargement des données...</p>
	}

	return (
		<div id='modifyTiersPage'>
			<Header
				props={{
					pageURL: `GIVOO | MODIFICATION FOURNISSEUR : ${tiersData.societe || ''}`,
				}}
			/>
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
					{activeTab === 'coordonnees' && (
						<div className='tab-panel'>
							<h2>Coordonnées</h2>
							<div className='form-container'>
								<label>
									Société :
									<input
										type='text'
										value={tiersData.societe || ''}
										onChange={(e) => handleInputChange('societe', e.target.value)}
									/>
								</label>
								<label>
									Activité :
									<input
										type='text'
										value={tiersData.activite || ''}
										onChange={(e) => handleInputChange('activite', e.target.value)}
									/>
								</label>
								<label>
									Rubrique :
									<input
										type='text'
										value={tiersData.rubrique_tresorerie || ''}
										onChange={(e) => handleInputChange('rubrique_tresorerie', e.target.value)}
									/>
								</label>
								<label>
									APE :
									<input
										type='text'
										value={tiersData.ape || ''}
										onChange={(e) => handleInputChange('ape', e.target.value)}
									/>
								</label>
								<label>
									SIRET :
									<input
										type='text'
										value={tiersData.siret || ''}
										onChange={(e) => handleInputChange('siret', e.target.value)}
									/>
								</label>
								<label>
									Forme juridique :
									<select
										value={tiersData.forme_juridique || ''}
										onChange={(e) => handleInputChange('forme_juridique', e.target.value)}
									>
										<option value='SARL'>SARL</option>
										<option value='SAS'>SAS</option>
										<option value='SA'>SA</option>
									</select>
								</label>
								<label>
									Rue :
									<input
										type='text'
										value={tiersData.rue || ''}
										onChange={(e) => handleInputChange('rue', e.target.value)}
									/>
								</label>
								<label>
									Complément :
									<input
										type='text'
										value={tiersData.complement || ''}
										onChange={(e) => handleInputChange('complement', e.target.value)}
									/>
								</label>
								<label>
									CP & Ville :
									<input type='text' value={`${tiersData.code_postal || ''} ${tiersData.ville || ''}`} readOnly />
								</label>
								<label>
									Pays :
									<input
										type='text'
										value={tiersData.pays || ''}
										onChange={(e) => handleInputChange('pays', e.target.value)}
									/>
								</label>
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
										value={tiersData.no_compte_general || ''}
										onChange={(e) => handleInputChange('no_compte_general', e.target.value)}
									/>
								</label>
								<label>
									N° Compte Charge :
									<input
										type='text'
										value={tiersData.no_compte_charge || ''}
										onChange={(e) => handleInputChange('no_compte_charge', e.target.value)}
									/>
								</label>
								<label>
									N° Compte Tiers :
									<input
										type='text'
										value={tiersData.no_compte_tiers || ''}
										onChange={(e) => handleInputChange('no_compte_tiers', e.target.value)}
									/>
								</label>
								<label>
									Intitulé du Compte :
									<input
										type='text'
										value={tiersData.intitule_compte_tiers || ''}
										onChange={(e) => handleInputChange('intitule_compte_tiers', e.target.value)}
									/>
								</label>
								<label>
									Type Compte :
									<select
										value={tiersData.type_compte || ''}
										onChange={(e) => handleInputChange('type_compte', e.target.value)}
									>
										<option value='Fournisseur'>Fournisseur</option>
										<option value='Client'>Client</option>
									</select>
								</label>
								<label>
									Assujetti TVA :
									<select
										value={tiersData.avec_tva || ''}
										onChange={(e) => handleInputChange('avec_tva', e.target.value)}
									>
										<option value='0'>Non</option>
										<option value='1'>Oui</option>
									</select>
								</label>
								<label>
									Taux TVA :
									<input
										type='text'
										value={tiersData.taux_tva || ''}
										onChange={(e) => handleInputChange('taux_tva', e.target.value)}
									/>
								</label>
								<label>
									BIC :
									<input
										type='text'
										value={tiersData.bic || ''}
										onChange={(e) => handleInputChange('bic', e.target.value)}
									/>
								</label>
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
										value={tiersData.mode_paiement || ''}
										onChange={(e) => handleInputChange('mode_paiement', e.target.value)}
									>
										<option value='Prélèvement'>Prélèvement</option>
										<option value='Virement'>Virement</option>
									</select>
								</label>
								<label>
									Partenaire Payeur :
									<select
										value={tiersData.partenaire_payeur || ''}
										onChange={(e) => handleInputChange('partenaire_payeur', e.target.value)}
									>
										<option value='0'>Non</option>
										<option value='1'>Oui</option>
									</select>
								</label>
							</div>
						</div>
					)}
				</div>
				<div className='buttons-container'>
					<Button
						props={{
							style: 'blue',
							text: 'Ok',
							type: 'button',
							onClick: handleSave,
						}}
					/>
					<Button
						props={{
							style: 'grey',
							text: 'Annuler',
							type: 'button',
							onClick: handleCancel,
						}}
					/>
				</div>
			</main>
		</div>
	)
}

export default ModifyTiersPage
