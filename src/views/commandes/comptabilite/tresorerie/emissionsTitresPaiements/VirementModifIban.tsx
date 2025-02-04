import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface'
import Header from '../../../../../components/header/Header'
import Footer from '../../../../../components/footer/Footer'
import Button from '../../../../../components/button/Button.tsx'
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
	const { prevision } = location.state as { prevision: RowDetails }

	if (!prevision) {
		return <div>Aucune donnée disponible.</div>
	}

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | MODIFICATION IBAN' }} />
			<main id='virementModifIban'>
				<section className='virementModifIban__content'>
					<h1>Modification IBAN</h1>
					<div className='details'>
						<h2>Détails du virement</h2>
						<p>
							<strong>Société:</strong> {prevision.societe}
						</p>
						<p>
							<strong>Bénéficiaire:</strong> {prevision.libelleCompteTiers}
						</p>
						<p>
							<strong>IBAN Cible:</strong> {prevision.ibanCible}
						</p>
						<p>
							<strong>BIC Cible:</strong> {prevision.bicCible}
						</p>
						<p>
							<strong>IBAN Source:</strong> {prevision.ibanSource}
						</p>
						<p>
							<strong>BIC Source:</strong> {prevision.bicSource}
						</p>
						<p>
							<strong>Montant:</strong> {prevision.montant} €
						</p>
					</div>
					<div className='actions'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default VirementModifIban
