import './ModifyTiersPage.scss'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../../../context/userContext'
import { postRequest } from '../../../../../API/APICalls'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button'

interface TiersData {
	societe?: string
	activite?: string
	rubrique_tresorerie?: string
	ape?: string
	siret?: string
	forme_juridique?: string
	rue?: string
	complement?: string
	code_postal?: string
	ville?: string
	pays?: string
	no_compte_general?: string
	no_compte_charge?: string
	no_compte_tiers?: string
	intitule_compte_tiers?: string
	type_compte?: string
	avec_tva?: string
	taux_tva?: string
	bic?: string
	iban_code_pays?: string
	iban_cle_pays?: string
	iban_code_banque?: string
	iban_code_guichet?: string
	iban_no_compte?: string
	iban_cle_rib?: string
	mode_paiement?: string
	partenaire_payeur?: string
	delai_reglement?: string
	recurrent?: string
	civilite_responsable?: string
	nom_responsable?: string
	telephone_responsable?: string
	mobile_responsable?: string
	fax_responsable?: string
	email_responsable?: string
	site_web?: string
	identifiant_site?: string
	mdf_site?: string
	civilite_contact1?: string
	nom_contact1?: string
	telephone_contact1?: string
	mobile_contact1?: string
	fax_contact1?: string
	email_contact1?: string
	civilite_contact2?: string
	nom_contact2?: string
	telephone_contact2?: string
	mobile_contact2?: string
	fax_contact2?: string
	email_contact2?: string
	beneficiaire_enregistre?: string
	banque_enregistre?: string
}

const ModifyTiersPage: React.FC = () => {
	const navigate = useNavigate()
	const { userCredentials } = useContext(UserContext)
	const { tiersId } = useParams<{ tiersId: string }>()
	const [tiersData, setTiersData] = useState<TiersData>({})
	const [activeTab, setActiveTab] = useState('coordonnees')
	const [isLoading, setIsLoading] = useState(false)

	const fetchTiersDetails = useCallback(async () => {
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
	}, [userCredentials, tiersId])

	useEffect(() => {
		fetchTiersDetails()
	}, [fetchTiersDetails])

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

	const handleInputChange = (field: keyof TiersData, value: string) => {
		setTiersData((prevData) => ({ ...prevData, [field]: value }))
	}

	if (isLoading) {
		return <p>Chargement des données...</p>
	}

	return (
		<div id='modifyTiersPage'>
			<Header
				props={{
					pageURL: `GIVOO | MODIFICATION FOURNISSEUR : ${tiersData.societe ?? 'NC'}`,
				}}
			/>
			<main>
				<div className='tabs-container'>
					<button
						type='button'
						className={`tab ${activeTab === 'coordonnees' ? 'active' : ''}`}
						onClick={() => handleTabChange('coordonnees')}
					>
						Coordonnées
					</button>
					<button
						type='button'
						className={`tab ${activeTab === 'compta' ? 'active' : ''}`}
						onClick={() => handleTabChange('compta')}
					>
						Compta
					</button>
					<button
						type='button'
						className={`tab ${activeTab === 'treso' ? 'active' : ''}`}
						onClick={() => handleTabChange('treso')}
					>
						Trésorerie
					</button>
				</div>
				<div className='tab-content'>
					{activeTab === 'coordonnees' && (
						<div className='coordonnees-container'>
							{/* New Coordonnées Section */}
							<section className='tab-panel'>
								<h2>Coordonnées</h2>
								<div className='form-container'>
									<label>
										Société :
										<input
											type='text'
											value={tiersData.societe ?? 'NC'}
											onChange={(e) => handleInputChange('societe', e.target.value)}
										/>
									</label>
									<label>
										Activité :
										<input
											type='text'
											value={tiersData.activite ?? 'NC'}
											onChange={(e) => handleInputChange('activite', e.target.value)}
										/>
									</label>
									<label>
										Rubrique :
										<input
											type='text'
											value={tiersData.rubrique_tresorerie ?? 'NC'}
											onChange={(e) => handleInputChange('rubrique_tresorerie', e.target.value)}
										/>
									</label>
									<label>
										APE :
										<input
											type='text'
											value={tiersData.ape ?? 'NC'}
											onChange={(e) => handleInputChange('ape', e.target.value)}
										/>
									</label>
									<label>
										SIRET :
										<input
											type='text'
											value={tiersData.siret ?? 'NC'}
											onChange={(e) => handleInputChange('siret', e.target.value)}
										/>
									</label>
									<label>
										Forme juridique :
										<select
											value={tiersData.forme_juridique ?? 'NC'}
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
											value={tiersData.rue ?? 'NC'}
											onChange={(e) => handleInputChange('rue', e.target.value)}
										/>
									</label>
									<label>
										Complément :
										<input
											type='text'
											value={tiersData.complement ?? 'NC'}
											onChange={(e) => handleInputChange('complement', e.target.value)}
										/>
									</label>
									<label>
										CP & Ville :
										<input type='text' value={`${tiersData.code_postal ?? 'NC'} ${tiersData.ville ?? 'NC'}`} readOnly />
									</label>
									<label>
										Pays :
										<input
											type='text'
											value={tiersData.pays ?? 'NC'}
											onChange={(e) => handleInputChange('pays', e.target.value)}
										/>
									</label>
								</div>
							</section>

							{/* Existing Responsable Section */}
							<section className='tab-panel'>
								<h2>Responsable</h2>
								<div className='form-container'>
									<label>
										Civilité :
										<select
											value={tiersData.civilite_responsable ?? 'NC'}
											onChange={(e) => handleInputChange('civilite_responsable', e.target.value)}
										>
											<option value='M.'>M.</option>
											<option value='Mme'>Mme</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={tiersData.intitule_compte_tiers ?? 'NC'}
											onChange={(e) => handleInputChange('nom_responsable', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={tiersData.telephone_responsable ?? 'NC'}
											onChange={(e) => handleInputChange('telephone_responsable', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={tiersData.mobile_responsable ?? 'NC'}
											onChange={(e) => handleInputChange('mobile_responsable', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={tiersData.fax_responsable ?? 'NC'}
											onChange={(e) => handleInputChange('fax_responsable', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={tiersData.email_responsable ?? 'NC'}
											onChange={(e) => handleInputChange('email_responsable', e.target.value)}
										/>
									</label>
									<label>
										Site Web :
										<input
											type='text'
											value={tiersData.site_web ?? 'NC'}
											onChange={(e) => handleInputChange('site_web', e.target.value)}
										/>
									</label>
									<label>
										Identifiant Site :
										<input
											type='text'
											value={tiersData.identifiant_site ?? 'NC'}
											onChange={(e) => handleInputChange('identifiant_site', e.target.value)}
										/>
									</label>
									<label>
										MDP Site :
										<input
											type='text'
											value={tiersData.mdf_site ?? 'NC'}
											onChange={(e) => handleInputChange('mdf_site', e.target.value)}
										/>
									</label>
								</div>
							</section>

							{/* Existing Contact I Section */}
							<section className='tab-panel'>
								<h2>Contact I</h2>
								<div className='form-container'>
									<label>
										Civilité :
										<select
											value={tiersData.civilite_contact1 ?? 'NC'}
											onChange={(e) => handleInputChange('civilite_contact1', e.target.value)}
										>
											<option value='M.'>M.</option>
											<option value='Mme'>Mme</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={tiersData.nom_contact1 ?? 'NC'}
											onChange={(e) => handleInputChange('nom_contact1', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={tiersData.telephone_contact1 ?? 'NC'}
											onChange={(e) => handleInputChange('telephone_contact1', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={tiersData.mobile_contact1 ?? 'NC'}
											onChange={(e) => handleInputChange('mobile_contact1', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={tiersData.fax_contact1 ?? 'NC'}
											onChange={(e) => handleInputChange('fax_contact1', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={tiersData.email_contact1 ?? 'NC'}
											onChange={(e) => handleInputChange('email_contact1', e.target.value)}
										/>
									</label>
								</div>
							</section>

							{/* Existing Contact II Section */}
							<section className='tab-panel'>
								<h2>Contact II</h2>
								<div className='form-container'>
									<label>
										Civilité :
										<select
											value={tiersData.civilite_contact2 ?? 'NC'}
											onChange={(e) => handleInputChange('civilite_contact2', e.target.value)}
										>
											<option value='M.'>M.</option>
											<option value='Mme'>Mme</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={tiersData.nom_contact2 ?? 'NC'}
											onChange={(e) => handleInputChange('nom_contact2', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={tiersData.telephone_contact2 ?? 'NC'}
											onChange={(e) => handleInputChange('telephone_contact2', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={tiersData.mobile_contact2 ?? 'NC'}
											onChange={(e) => handleInputChange('mobile_contact2', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={tiersData.fax_contact2 ?? 'NC'}
											onChange={(e) => handleInputChange('fax_contact2', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={tiersData.email_contact2 ?? 'NC'}
											onChange={(e) => handleInputChange('email_contact2', e.target.value)}
										/>
									</label>
								</div>
							</section>
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
										value={tiersData.no_compte_general ?? 'NC'}
										onChange={(e) => handleInputChange('no_compte_general', e.target.value)}
									/>
								</label>
								<label>
									N° Compte Charge :
									<input
										type='text'
										value={tiersData.no_compte_charge ?? 'NC'}
										onChange={(e) => handleInputChange('no_compte_charge', e.target.value)}
									/>
								</label>
								<label>
									N° Compte Tiers :
									<input
										type='text'
										value={tiersData.no_compte_tiers ?? 'NC'}
										onChange={(e) => handleInputChange('no_compte_tiers', e.target.value)}
									/>
								</label>
								<label>
									Intitulé du Compte :
									<input
										type='text'
										value={tiersData.intitule_compte_tiers ?? 'NC'}
										onChange={(e) => handleInputChange('intitule_compte_tiers', e.target.value)}
									/>
								</label>
								<label>
									Type Compte :
									<select
										value={tiersData.type_compte ?? 'NC'}
										onChange={(e) => handleInputChange('type_compte', e.target.value)}
									>
										<option value='Fournisseur'>Fournisseur</option>
										<option value='Client'>Client</option>
									</select>
								</label>
								<label>
									Assujetti TVA :
									<select
										value={tiersData.avec_tva ?? 'NC'}
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
										value={tiersData.taux_tva ?? 'NC'}
										onChange={(e) => handleInputChange('taux_tva', e.target.value)}
									/>
								</label>
								<label>
									BIC :
									<input
										type='text'
										value={tiersData.bic ?? 'NC'}
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
										value={tiersData.mode_paiement ?? 'NC'}
										onChange={(e) => handleInputChange('mode_paiement', e.target.value)}
									>
										<option value='Prélèvement'>Prélèvement</option>
										<option value='Virement'>Virement</option>
									</select>
								</label>
								<label>
									Partenaire Payeur :
									<select
										value={tiersData.partenaire_payeur ?? 'NC'}
										onChange={(e) => handleInputChange('partenaire_payeur', e.target.value)}
									>
										<option value='0'>Non</option>
										<option value='1'>Oui</option>
									</select>
								</label>
								<label>
									Délai de Règlement :
									<input
										type='text'
										value={tiersData.delai_reglement ?? 'NC'}
										onChange={(e) => handleInputChange('delai_reglement', e.target.value)}
									/>
								</label>
								<label>
									Bénéficiaire Enregistré :
									<select
										value={tiersData.beneficiaire_enregistre ?? 'NC'}
										onChange={(e) => handleInputChange('beneficiaire_enregistre', e.target.value)}
									>
										<option value='0'>Non</option>
										<option value='1'>Oui</option>
									</select>
								</label>
								<label>
									Banque Enregistrée :
									<input
										type='text'
										value={tiersData.banque_enregistre ?? 'NC'}
										onChange={(e) => handleInputChange('banque_enregistre', e.target.value)}
									/>
								</label>
								<label>
									Récurrent :
									<select
										value={tiersData.recurrent ?? 'NC'}
										onChange={(e) => handleInputChange('recurrent', e.target.value)}
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
