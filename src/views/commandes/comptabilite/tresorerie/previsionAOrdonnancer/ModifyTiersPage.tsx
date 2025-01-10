import './ModifyTiersPage.scss'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../../../context/userContext'
import { postRequest } from '../../../../../API/APICalls'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button'
import { parseIBAN } from '../../../../../utils/scripts/utils'

interface TiersData {
	actif?: string
	activite?: string
	ape?: string
	auteur_creation?: string
	auteur_validation?: string
	avec_tva?: string
	banque_beneficiaire?: string
	beneficiaire_enregistre?: string
	bic?: string
	cle_rubrique_tresorerie?: string
	code?: string
	code_postal?: string
	code_regrp2?: string
	complement?: string
	contact1_civilite?: string
	contact1_email?: string
	contact1_fax?: string
	contact1_mobile?: string
	contact1_nom?: string
	contact1_telephone?: string
	contact2_civilite?: string
	contact2_email?: string
	contact2_fax?: string
	contact2_mobile?: string
	contact2_nom?: string
	contact2_telephone?: string
	date_creation?: string
	date_statut?: string
	date_validation?: string
	delai_reglement?: string
	forme_juridique?: string
	iban?: string
	iban_cle_pays?: string
	iban_cle_rib?: string
	iban_code_banque?: string
	iban_code_guichet?: string
	iban_code_pays?: string
	iban_no_compte?: string
	identifiant?: string
	interco?: string
	intitule_compte_tiers?: string
	mode_paiement?: string
	mot_de_passe?: string
	no_compte_charge?: string
	no_compte_general?: string
	no_compte_tiers?: string
	partenaire_payeur?: string
	pays?: string
	recurrent?: string
	responsable_civilite?: string
	responsable_email?: string
	responsable_fax?: string
	responsable_mobile?: string
	responsable_nom?: string
	responsable_telephone?: string
	rubrique_tresorerie?: string
	rue?: string
	siret?: string
	site_internet?: string
	societe?: string
	societe_code_compta?: string
	statut?: string
	taux_tva?: string
	type_compte?: string
	ville?: string
}

const isFieldInvalid = (value: string | undefined, expectedLength: number) => {
	const trimmedValue = value?.trim() // Trim the value to remove useless spaces
	return !trimmedValue || trimmedValue === 'NC' || trimmedValue.length !== expectedLength
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
			const data = res.data?.data?.rows || {}

			// Parse IBAN and fill missing or invalid fields
			if (data.iban) {
				const parsedIBAN = parseIBAN(data.iban)

				if (parsedIBAN) {
					const updatedData = { ...data }

					// Fill in missing or invalid fields
					if (isFieldInvalid(updatedData.iban_code_pays, 2)) {
						updatedData.iban_code_pays = parsedIBAN.iban_code_pays
					}
					if (isFieldInvalid(updatedData.iban_cle_pays, 2)) {
						updatedData.iban_cle_pays = parsedIBAN.iban_cle_pays
					}
					if (isFieldInvalid(updatedData.iban_code_banque, 5)) {
						updatedData.iban_code_banque = parsedIBAN.iban_code_banque
					}
					if (isFieldInvalid(updatedData.iban_code_guichet, 5)) {
						updatedData.iban_code_guichet = parsedIBAN.iban_code_guichet
					}
					if (isFieldInvalid(updatedData.iban_no_compte, 11)) {
						updatedData.iban_no_compte = parsedIBAN.iban_no_compte
					}
					if (isFieldInvalid(updatedData.iban_cle_rib, 2)) {
						updatedData.iban_cle_rib = parsedIBAN.iban_cle_rib
					}

					setTiersData(updatedData)
					return
				}
			}

			// If no IBAN or parsing fails, set the original data
			setTiersData(data)
		} catch (error) {
			console.error('Erreur lors de la récupération des données du fournisseur :', error)
		} finally {
			setIsLoading(false)
		}
	}, [userCredentials, tiersId]) // Dependencies for useCallback

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
											value={tiersData.responsable_civilite ?? 'NC'}
											onChange={(e) => handleInputChange('responsable_civilite', e.target.value)}
										>
											<option value='M.'>M.</option>
											<option value='Mme'>Mme</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={tiersData.responsable_nom ?? 'NC'}
											onChange={(e) => handleInputChange('responsable_nom', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={tiersData.responsable_telephone ?? 'NC'}
											onChange={(e) => handleInputChange('responsable_telephone', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={tiersData.responsable_mobile ?? 'NC'}
											onChange={(e) => handleInputChange('responsable_mobile', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={tiersData.responsable_fax ?? 'NC'}
											onChange={(e) => handleInputChange('responsable_fax', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={tiersData.responsable_email ?? 'NC'}
											onChange={(e) => handleInputChange('responsable_email', e.target.value)}
										/>
									</label>
									<label>
										Site Web :
										<input
											type='text'
											value={tiersData.site_internet ?? 'NC'}
											onChange={(e) => handleInputChange('site_internet', e.target.value)}
										/>
									</label>
									<label>
										Identifiant Site :
										<input
											type='text'
											value={tiersData.identifiant ?? 'NC'}
											onChange={(e) => handleInputChange('identifiant', e.target.value)}
										/>
									</label>
									<label>
										MDP Site :
										<input
											type='text'
											value={tiersData.mot_de_passe ?? 'NC'}
											onChange={(e) => handleInputChange('mot_de_passe', e.target.value)}
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
											value={tiersData.contact1_civilite ?? 'NC'}
											onChange={(e) => handleInputChange('contact1_civilite', e.target.value)}
										>
											<option value='M.'>M.</option>
											<option value='Mme'>Mme</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={tiersData.contact1_nom ?? 'NC'}
											onChange={(e) => handleInputChange('contact1_nom', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={tiersData.contact1_telephone ?? 'NC'}
											onChange={(e) => handleInputChange('contact1_telephone', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={tiersData.contact1_mobile ?? 'NC'}
											onChange={(e) => handleInputChange('contact1_mobile', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={tiersData.contact1_fax ?? 'NC'}
											onChange={(e) => handleInputChange('contact1_fax', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={tiersData.contact1_email ?? 'NC'}
											onChange={(e) => handleInputChange('contact1_email', e.target.value)}
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
											value={tiersData.contact2_civilite ?? 'NC'}
											onChange={(e) => handleInputChange('contact2_civilite', e.target.value)}
										>
											<option value='M.'>M.</option>
											<option value='Mme'>Mme</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={tiersData.contact2_nom ?? 'NC'}
											onChange={(e) => handleInputChange('contact2_nom', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={tiersData.contact2_telephone ?? 'NC'}
											onChange={(e) => handleInputChange('contact2_telephone', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={tiersData.contact2_mobile ?? 'NC'}
											onChange={(e) => handleInputChange('contact2_mobile', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={tiersData.contact2_fax ?? 'NC'}
											onChange={(e) => handleInputChange('contact2_fax', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={tiersData.contact2_email ?? 'NC'}
											onChange={(e) => handleInputChange('contact2_email', e.target.value)}
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
										value={Number(tiersData.taux_tva) || 'NC'}
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

								{/* New IBAN Fields */}
								<label>IBAN :</label>
								<div className='iban-fields'>
									<label>
										Code pays :
										<input
											type='text'
											value={tiersData.iban_code_pays ?? 'NC'}
											onChange={(e) => handleInputChange('iban_code_pays', e.target.value)}
										/>
									</label>
									<label>
										Clé pays :
										<input
											type='text'
											value={tiersData.iban_cle_pays ?? 'NC'}
											onChange={(e) => handleInputChange('iban_cle_pays', e.target.value)}
										/>
									</label>
									<label>
										Code banque :
										<input
											type='text'
											value={tiersData.iban_code_banque ?? 'NC'}
											onChange={(e) => handleInputChange('iban_code_banque', e.target.value)}
										/>
									</label>
									<label>
										Code guichet :
										<input
											type='text'
											value={tiersData.iban_code_guichet ?? 'NC'}
											onChange={(e) => handleInputChange('iban_code_guichet', e.target.value)}
										/>
									</label>
									<label>
										N° compte :
										<input
											type='text'
											value={tiersData.iban_no_compte ?? 'NC'}
											onChange={(e) => handleInputChange('iban_no_compte', e.target.value)}
										/>
									</label>
									<label>
										Clé RIB :
										<input
											type='text'
											value={tiersData.iban_cle_rib ?? 'NC'}
											onChange={(e) => handleInputChange('iban_cle_rib', e.target.value)}
										/>
									</label>
								</div>
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
										value={tiersData.banque_beneficiaire ?? 'NC'}
										onChange={(e) => handleInputChange('banque_beneficiaire', e.target.value)}
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
