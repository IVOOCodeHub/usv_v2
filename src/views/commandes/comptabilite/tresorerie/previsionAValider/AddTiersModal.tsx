import React, { useState } from 'react'
import Button from '../../../../../components/button/Button'
import './AddTiersModal.scss'

interface TiersData {
	societe?: string
	activite?: string
	rubrique?: string
	typeCompte?: string
	ape?: string
	siret?: string
	formeJuridique?: string
	rue?: string
	complement?: string
	codePostal?: string
	ville?: string
	pays?: string
	responsableCivilite?: string
	responsableNom?: string
	responsableTelephone?: string
	responsableMobile?: string
	responsableFax?: string
	responsableEmail?: string
	contact1Civilite?: string
	contact1Nom?: string
	contact1Telephone?: string
	contact1Mobile?: string
	contact1Fax?: string
	contact1Email?: string
	contact2Civilite?: string
	contact2Nom?: string
	contact2Telephone?: string
	contact2Mobile?: string
	contact2Fax?: string
	contact2Email?: string
	siteInternet?: string
	identifiantSite?: string
	motDePasseSite?: string
}

const AddTiersModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const [formData, setFormData] = useState<TiersData>({})
	const [activeTab, setActiveTab] = useState('coordonnees')

	const handleInputChange = (field: keyof TiersData, value: string) => {
		setFormData((prevData) => ({ ...prevData, [field]: value }))
	}

	const handleSave = () => {
		console.log('Form Data:', formData)
		alert('Tiers ajouté avec succès')
		onClose()
	}

	const handleCancel = () => {
		onClose()
	}

	return (
		<div id='addTiersModal'>
			<div className='modal-content'>
				{/* Modal Title */}
				<h2 className='modal-title'>GIVOO | AJOUTER UN TIERS</h2>

				{/* Tabs */}
				<div className='tabs-container'>
					<button
						type='button'
						className={`tab ${activeTab === 'coordonnees' ? 'active' : ''}`}
						onClick={() => setActiveTab('coordonnees')}
					>
						Coordonnées
					</button>
					<button
						type='button'
						className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
						onClick={() => setActiveTab('contacts')}
					>
						Contacts
					</button>
					<button
						type='button'
						className={`tab ${activeTab === 'WEB' ? 'active' : ''}`}
						onClick={() => setActiveTab('WEB')}
					>
						WEB
					</button>
				</div>

				{/* Tab Content */}
				<div className='tab-content'>
					{activeTab === 'coordonnees' && (
						<div className='coordonnees-container'>
							{/* Identité Section */}
							<section className='tab-panel'>
								<h2>Identité</h2>
								<div className='form-container'>
									<label>
										Société :
										<input
											type='text'
											value={formData.societe ?? ''}
											onChange={(e) => handleInputChange('societe', e.target.value)}
										/>
									</label>
									<label>
										Activité :
										<input
											type='text'
											value={formData.activite ?? ''}
											onChange={(e) => handleInputChange('activite', e.target.value)}
										/>
									</label>
									<label>
										Rubrique :
										<input
											type='text'
											value={formData.rubrique ?? ''}
											onChange={(e) => handleInputChange('rubrique', e.target.value)}
										/>
									</label>
									<label>
										Type de Compte :
										<select
											value={formData.typeCompte ?? ''}
											onChange={(e) => handleInputChange('typeCompte', e.target.value)}
										>
											<option value='NC'>Choisir</option>
											<option value='F'>Fournisseur</option>
											<option value='C'>Client</option>
											<option value='P'>Partenaire</option>
											<option value='A'>Autre</option>
										</select>
									</label>
									<label>
										APE :
										<input
											type='text'
											value={formData.ape ?? ''}
											onChange={(e) => handleInputChange('ape', e.target.value)}
										/>
									</label>
									<label>
										SIRET :
										<input
											type='text'
											value={formData.siret ?? ''}
											onChange={(e) => handleInputChange('siret', e.target.value)}
										/>
									</label>
									<label>
										Forme juridique :
										<select
											value={formData.formeJuridique ?? ''}
											onChange={(e) => handleInputChange('formeJuridique', e.target.value)}
										>
											<option value='NC'>Choisir</option>
											<option value='SA'>SA</option>
											<option value='SAS'>SAS</option>
											<option value='SARL'>SARL</option>
											<option value='EURL'>EURL</option>
											<option value='SNC'>SNC</option>
											<option value='SCP'>SCP</option>
											<option value='GIE'>GIE</option>
											<option value='LIBERALE'>Profession libérale</option>
											<option value='ETR'>Autre (étranger)</option>
										</select>
									</label>
								</div>
							</section>

							{/* Adresse Section */}
							<section className='tab-panel'>
								<h2>Adresse</h2>
								<div className='form-container'>
									<label>
										Rue :
										<input
											type='text'
											value={formData.rue || ''}
											onChange={(e) => handleInputChange('rue', e.target.value)}
										/>
									</label>
									<label>
										Complément :
										<input
											type='text'
											value={formData.complement || ''}
											onChange={(e) => handleInputChange('complement', e.target.value)}
										/>
									</label>
									<label>
										Code Postal :
										<input
											type='text'
											value={formData.codePostal || ''}
											onChange={(e) => handleInputChange('codePostal', e.target.value)}
										/>
									</label>
									<label>
										Ville :
										<input
											type='text'
											value={formData.ville || ''}
											onChange={(e) => handleInputChange('ville', e.target.value)}
										/>
									</label>
									<label>
										Pays :
										<select value={formData.pays || ''} onChange={(e) => handleInputChange('pays', e.target.value)}>
											<option value='NC'>Choisir</option>
											<option value='FR'>France</option>
											<option value='ALG'>Algérie</option>
											<option value='TUN'>Tunisie</option>
											<option value='MAR'>Maroc</option>
											<option value='SP'>Espagne</option>
											<option value='GB'>Grande Bretagne</option>
											<option value='AUTRE'>Autre</option>
										</select>
									</label>
								</div>
							</section>
						</div>
					)}

					{activeTab === 'contacts' && (
						<div className='coordonnees-container'>
							<section className='tab-panel'>
								<h2>Responsable</h2>
								<div className='form-container'>
									<label>
										Civilité :
										<select
											value={formData.responsableCivilite || ''}
											onChange={(e) => handleInputChange('responsableCivilite', e.target.value)}
										>
											<option value='NC'>Choisir</option>
											<option value='Monsieur'>Monsieur</option>
											<option value='Madame'>Madame</option>
											<option value='Mademoiselle'>Mademoiselle</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={formData.responsableNom || ''}
											onChange={(e) => handleInputChange('responsableNom', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={formData.responsableTelephone || ''}
											onChange={(e) => handleInputChange('responsableTelephone', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={formData.responsableMobile || ''}
											onChange={(e) => handleInputChange('responsableMobile', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={formData.responsableFax || ''}
											onChange={(e) => handleInputChange('responsableFax', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={formData.responsableEmail || ''}
											onChange={(e) => handleInputChange('responsableEmail', e.target.value)}
										/>
									</label>
								</div>
							</section>
							<section className='tab-panel'>
								<h2>Contact I</h2>
								<div className='form-container'>
									<label>
										Civilité :
										<select
											value={formData.contact1Civilite || ''}
											onChange={(e) => handleInputChange('contact1Civilite', e.target.value)}
										>
											<option value='NC'>Choisir</option>
											<option value='Monsieur'>Monsieur</option>
											<option value='Madame'>Madame</option>
											<option value='Mademoiselle'>Mademoiselle</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={formData.contact1Nom || ''}
											onChange={(e) => handleInputChange('contact1Nom', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={formData.contact1Telephone || ''}
											onChange={(e) => handleInputChange('contact1Telephone', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={formData.contact1Mobile || ''}
											onChange={(e) => handleInputChange('contact1Mobile', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={formData.contact1Fax || ''}
											onChange={(e) => handleInputChange('contact1Fax', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={formData.contact1Email || ''}
											onChange={(e) => handleInputChange('contact1Email', e.target.value)}
										/>
									</label>
								</div>
							</section>
							<section className='tab-panel'>
								<h2>Contact II</h2>
								<div className='form-container'>
									<label>
										Civilité :
										<select
											value={formData.contact2Civilite || ''}
											onChange={(e) => handleInputChange('contact2Civilite', e.target.value)}
										>
											<option value='NC'>Choisir</option>
											<option value='Monsieur'>Monsieur</option>
											<option value='Madame'>Madame</option>
											<option value='Mademoiselle'>Mademoiselle</option>
										</select>
									</label>
									<label>
										Nom :
										<input
											type='text'
											value={formData.contact2Nom || ''}
											onChange={(e) => handleInputChange('contact2Nom', e.target.value)}
										/>
									</label>
									<label>
										Téléphone :
										<input
											type='text'
											value={formData.contact2Telephone || ''}
											onChange={(e) => handleInputChange('contact2Telephone', e.target.value)}
										/>
									</label>
									<label>
										Mobile :
										<input
											type='text'
											value={formData.contact2Mobile || ''}
											onChange={(e) => handleInputChange('contact2Mobile', e.target.value)}
										/>
									</label>
									<label>
										Fax :
										<input
											type='text'
											value={formData.contact2Fax || ''}
											onChange={(e) => handleInputChange('contact2Fax', e.target.value)}
										/>
									</label>
									<label>
										Email :
										<input
											type='email'
											value={formData.contact2Email || ''}
											onChange={(e) => handleInputChange('contact2Email', e.target.value)}
										/>
									</label>
								</div>
							</section>
						</div>
					)}

					{activeTab === 'WEB' && (
						<div className='coordonnees-container'>
							<section className='tab-panel'>
								<div className='form-container'>
									<label>
										Site Web :
										<input
											type='text'
											value={formData.siteInternet || ''}
											onChange={(e) => handleInputChange('siteInternet', e.target.value)}
										/>
									</label>
									<label>
										Identifiant Site :
										<input
											type='text'
											value={formData.identifiantSite || ''}
											onChange={(e) => handleInputChange('identifiantSite', e.target.value)}
										/>
									</label>
									<label>
										MDP Site :
										<input
											type='text'
											value={formData.motDePasseSite || ''}
											onChange={(e) => handleInputChange('motDePasseSite', e.target.value)}
										/>
									</label>
								</div>
							</section>
						</div>
					)}
				</div>

				{/* Buttons */}
				<div className='buttons-container'>
					<Button
						props={{
							style: 'blue',
							text: 'Enregistrer',
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
			</div>
		</div>
	)
}

export default AddTiersModal
