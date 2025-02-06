import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import ModalBankEntries from './ModalBankEntries.tsx'
import './emissionsODV.scss'

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

	// New fields from the ASP code
	ibanCible: string // IBAN of the recipient
	bicCible: string // BIC of the recipient
	ibanSource: string // IBAN of the issuer
	bicSource: string // BIC of the issuer
	libelleTiers: string // Description of the supplier
	noCompteBanque: string // Bank account number
	cleCourrier: string // Unique key for the payment
	ibanTiers: string // IBAN of the supplier (from fournisseurs table)
	bicTiers: string // BIC of the supplier (from fournisseurs table)
	nomBanque: string // Bank name (from banques_comptes_societes table)
}

const VirementModifIban: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedBankEntry, setSelectedBankEntry] = useState<{
		code: string
		date: string
		libelle: string
		debit: string
	} | null>(null)

	// Open the modal
	const openModal = () => {
		setIsModalOpen(true)
	}

	// Close the modal
	const closeModal = () => {
		setIsModalOpen(false)
	}

	// Handle bank entry selection
	const handleSelectBankEntry = (bankEntry: { code: string; date: string; libelle: string; debit: string }) => {
		setSelectedBankEntry(bankEntry)
		// You can now associate the selected bank entry with the expenditure forecast
		console.log('Selected Bank Entry:', bankEntry)
	}

	const { prevision } = location.state as { prevision: RowDetails }

	if (!prevision) {
		return <div>Aucune donnée disponible.</div>
	}

	const handleInputChange = (field: keyof RowDetails, value: string) => {
		console.log(field, value)
	}

	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | MODIFICATION DES IBAN / BIC du virement ${prevision.cle}` }} />
			<div id='virementModifIban'>
				<div className='alreadyPaidButtonWrapper'>
					<Button props={{ style: 'blue', text: 'Marquer comme déjà payé', type: 'button', onClick: openModal }} />
				</div>
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
										value={prevision.societe ?? ''}
										onChange={(e) => handleInputChange('societe', e.target.value)}
									/>
								</label>
								<label>
									Banque :
									<input
										type='text'
										value={prevision.nomBanque ?? ''}
										onChange={(e) => handleInputChange('nomBanque', e.target.value)}
									/>
								</label>
								<label>
									IBAN Source :
									<input
										type='text'
										value={prevision.ibanSource ?? ''}
										onChange={(e) => handleInputChange('ibanSource', e.target.value)}
									/>
								</label>
								<label>
									BIC Source :
									<input
										type='text'
										value={prevision.bicSource ?? ''}
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
										value={prevision.libelleTiers ?? ''}
										onChange={(e) => handleInputChange('libelleTiers', e.target.value)}
									/>
								</label>
								<label>
									IBAN Cible :
									<input
										type='text'
										value={prevision.ibanCible ?? ''}
										onChange={(e) => handleInputChange('ibanCible', e.target.value)}
									/>
								</label>
								<label>
									BIC Cible :
									<input
										type='text'
										value={prevision.bicCible ?? ''}
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
										value={prevision.libelleEcriture ?? ''}
										onChange={(e) => handleInputChange('libelleEcriture', e.target.value)}
									/>
								</label>
								<label>
									Date Ordo :
									<input
										type='date'
										value={prevision.dateOrdo ?? ''}
										onChange={(e) => handleInputChange('dateOrdo', e.target.value)}
									/>
								</label>
								<label>
									Montant :
									<input
										type='text'
										value={parseFloat(prevision.credit.replace(/\s/g, '').replace(',', '.')) ?? 0}
										onChange={(e) => handleInputChange('credit', e.target.value)}
									/>
								</label>
							</div>
						</section>
					</div>

					{/* Modal for bank entries */}
					<ModalBankEntries
						isOpen={isModalOpen}
						onClose={closeModal}
						onSelectBankEntry={handleSelectBankEntry}
						libelleTiers={prevision.libelleTiers}
						libelleEcriture={prevision.libelleEcriture}
					/>
				</div>

				<div className='actions'>
					<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
				</div>
			</div>
		</>
	)
}

export default VirementModifIban
