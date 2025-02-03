import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface'
import Header from '../../../../../components/header/Header'
import Footer from '../../../../../components/footer/Footer'
import Button from '../../../../../components/button/Button.tsx'
import './emissionsODV.scss'

interface VirementData {
  cle?: string
  societe?: string
  numeroIdBank?: string
  codeIdBank?: string
  nomIdBank?: string
  bic?: string
}

const VirementModifIban: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { prevision } = location.state as { prevision: IPrevision }

	if (!prevision) {
		return <div>Aucune donnée disponible.</div>
	}

  const [formData, setFormData] = useState<TiersData>({})

  const handleInputChange = (field: keyof VirementData, value: string) => {
    setFormData((prevData: VirementData) => ({ ...prevData, [field]: value }))
	}
	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | MODIFICATION IBAN / BIC du virement ${prevision.cle}` }} />
			<main id='virementModifIban'>
				<section className='virementModifIban__content'>
					<h1>Modification IBAN</h1>
					<div className='tab-content'>
						<div className='coordonnees-container'>
							{/* Identité Section */}
							<section className='tab-panel'>
								<h2>Identité</h2>
								<div className='form-container'>
									<label>
										Société :
										<input
											type='text'
											value={prevision.societe ?? ''}
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
					</div>
					{/* Buttons */}
					<div className='buttons-container'>
						<Button
							props={{
								style: 'blue',
								text: 'Ok',
								type: 'button',
								onClick: () => navigate(-1),
							}}
						/>
						<Button
							props={{
								style: 'grey',
								text: 'Annuler',
								type: 'button',
								onClick: () => navigate(-1),
							}}
						/>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default VirementModifIban
