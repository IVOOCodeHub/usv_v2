import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import './detailEcheancier.scss'

interface RowDetails {
	cle: string
	societe: string
	dateSaisie: string
	dateEcheance: string
	libelleCompteTiers: string
	libelleEcriture: string
	libelleEcritureAnnee: string
	libelleEcritureMois: string
	libelleEcriturePrefixe: string
	libelleEcritureTrimestre: string
	libelleEcritureBeneficiaire: string
	credit: string
	debit: string
	montant: string
	rubriqueTreso: string
	nomFichier?: string
	dateOrdo: string
	modeReglement: string
	statut: string
	refSourceTiers: string
	ibanCible: string
	bicCible: string
	ibanSource: string
	bicSource: string
	libelleTiers: string
	noCompteBanque: string
	cleCourrier: string
	ibanTiers: string
	bicTiers: string
	nomBanque: string
}

const DetailEcheancier: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const { fullRowDetails } = location.state as { fullRowDetails: RowDetails }

	if (!fullRowDetails) {
		return <div>Aucune donnée disponible.</div>
	}

	const handleInputChange = (field: keyof RowDetails, value: string) => {
		console.log(field, value)
	}

	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | DÉTAILS DE L'ÉCHÉANCE ${fullRowDetails.cle}` }} />
			<div id='detailEcheancier'>
				<div className='main-container'>
					<div className='coordonnees-container'>
						{/* Section Emetteur */}
						<section className='tab-panel'>
							<h2>EMETTEUR</h2>
							<div className='form-container'>
								<label>
									Société :
									<input
										type='text'
										value={fullRowDetails.societe ?? ''}
										onChange={(e) => handleInputChange('societe', e.target.value)}
									/>
								</label>
								<label>
									Banque :
									<input
										type='text'
										value={fullRowDetails.nomBanque ?? ''}
										onChange={(e) => handleInputChange('nomBanque', e.target.value)}
									/>
								</label>
								<label>
									IBAN Source :
									<input
										type='text'
										value={fullRowDetails.ibanSource ?? ''}
										onChange={(e) => handleInputChange('ibanSource', e.target.value)}
									/>
								</label>
								<label>
									BIC Source :
									<input
										type='text'
										value={fullRowDetails.bicSource ?? ''}
										onChange={(e) => handleInputChange('bicSource', e.target.value)}
									/>
								</label>
							</div>
						</section>

						{/* Section Destinataire */}
						<section className='tab-panel'>
							<h2>DESTINATAIRE</h2>
							<div className='form-container'>
								<label>
									Tiers :
									<input
										type='text'
										value={fullRowDetails.libelleTiers ?? ''}
										onChange={(e) => handleInputChange('libelleTiers', e.target.value)}
									/>
								</label>
								<label>
									IBAN Cible :
									<input
										type='text'
										value={fullRowDetails.ibanCible ?? ''}
										onChange={(e) => handleInputChange('ibanCible', e.target.value)}
									/>
								</label>
								<label>
									BIC Cible :
									<input
										type='text'
										value={fullRowDetails.bicCible ?? ''}
										onChange={(e) => handleInputChange('bicCible', e.target.value)}
									/>
								</label>
							</div>
						</section>

						{/* Section Libellé */}
						<section className='tab-panel'>
							<div className='form-container'>
								<label>
									Libellé :
									<input
										type='text'
										name='libelleEcriture'
										value={fullRowDetails.libelleEcriture ?? ''}
										onChange={(e) => handleInputChange('libelleEcriture', e.target.value)}
									/>
								</label>
								<label>
									Date Ordo :
									<input
										type='date'
										value={fullRowDetails.dateOrdo ?? ''}
										onChange={(e) => handleInputChange('dateOrdo', e.target.value)}
									/>
								</label>
								<label>
									Montant :
									<input
										type='text'
										value={parseFloat(fullRowDetails.credit.replace(/\s/g, '').replace(',', '.')) ?? 0}
										onChange={(e) => handleInputChange('credit', e.target.value)}
									/>
								</label>
							</div>
						</section>
					</div>
				</div>

				<div className='actions'>
					<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
				</div>
			</div>
		</>
	)
}

export default DetailEcheancier
