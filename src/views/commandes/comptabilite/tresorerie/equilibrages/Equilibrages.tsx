import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import './equilibrages.scss'
import { mockedEquilibrages } from './mock/mockedEquilibrages.ts'

interface RowDetails {
	societe: string
	cle: string
	dateSaisie: string
	dateEcheance: string
	libelleCompteTiers: string
	libelleEcriture: string
	credit: string
	debit: string
	nomFichier?: string
	dernierSolde: string
	emisNonDecaisse: string
	soldeApresEND: string
	decouvertAutorise: string
	mobilisable: string
	ordo: string
	soldeApresOrdo: string
	soldeApresEqui: string
}

const Equilibrages: React.FC = () => {
	const navigate = useNavigate()

	// State for table data
	const [bodyArray, setBodyArray] = useState<(string | undefined)[][]>([])

	// Convert data for the table
	const convertToArray = (datas: RowDetails[]): (string | undefined)[][] => {
		return datas.map((data) => [
			data.societe ?? 'Non défini', // Banque
			data.cle || 'Non défini', // Code
			data.dateSaisie ?? 'Non défini', // Date saisie
			data.dateEcheance ?? 'Non défini', // Date échéance
			data.libelleCompteTiers ?? 'Non défini', // Fournisseur
			data.libelleEcriture ?? 'Non défini', // Libellé
			data.credit ? parseFloat(data.credit).toFixed(2) : '0.00', // Montant
			data.debit ? parseFloat(data.debit).toFixed(2) : '0.00', // Montant
			data.nomFichier ?? 'Non défini', // Courrier
			data.dernierSolde ?? 'Non défini', // Dernier Solde
			data.emisNonDecaisse ?? 'Non défini', // Emis Non Décaissé
			data.soldeApresEND ?? 'Non défini', // Solde après E.N.D.
			data.decouvertAutorise ?? 'Non défini', // Découvert Autorisé
			data.mobilisable ?? 'Non défini', // Mobilisable
			data.ordo ?? 'Non défini', // Ordo
			data.soldeApresOrdo ?? 'Non défini', // Solde après Ordo
			data.soldeApresEqui ?? 'Non défini', // Solde après Equi
		])
	}

	// Function to get row details
	const getRowDetails = (cle: string): RowDetails | undefined => {
		const matchedPrevision = mockedEquilibrages.find((prevision) => prevision.cle === cle)
		if (!matchedPrevision) return undefined

		return {
			societe: matchedPrevision.societe ?? 'Non défini',
			cle: matchedPrevision.cle || 'Non défini',
			dateSaisie: matchedPrevision.dateSaisie ?? 'Non défini',
			dateEcheance: matchedPrevision.dateEcheance ?? 'Non défini',
			libelleCompteTiers: matchedPrevision.libelleCompteTiers ?? 'Non défini',
			libelleEcriture: matchedPrevision.libelleEcriture ?? 'Non défini',
			credit: matchedPrevision.credit ? parseFloat(matchedPrevision.credit).toFixed(2) : '0.00',
			debit: matchedPrevision.debit ? parseFloat(matchedPrevision.debit).toFixed(2) : '0.00',
			nomFichier: matchedPrevision.nomFichier ?? 'Non défini',
			dernierSolde: matchedPrevision.dernierSolde ?? 'Non défini',
			emisNonDecaisse: matchedPrevision.emisNonDecaisse ?? 'Non défini',
			soldeApresEND: matchedPrevision.soldeApresEND ?? 'Non défini',
			decouvertAutorise: matchedPrevision.decouvertAutorise ?? 'Non défini',
			mobilisable: matchedPrevision.mobilisable ?? 'Non défini',
			ordo: matchedPrevision.ordo ?? 'Non défini',
			soldeApresOrdo: matchedPrevision.soldeApresOrdo ?? 'Non défini',
			soldeApresEqui: matchedPrevision.soldeApresEqui ?? 'Non défini',
		}
	}

	// Update table data with mocked data
	useEffect(() => {
		setBodyArray(convertToArray(mockedEquilibrages))
	}, [])

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | EQUILIBRAGES' }} />
			<main id='equilibrages'>
				<section className='equilibrages__bottomSection'>
					<div id='groupedTable'>
						{bodyArray.length === 0 ? (
							<div className='no-results'>Aucune donnée disponible.</div>
						) : (
							<NRTL
								datas={{
									tableHead: [
										'Banque',
										'Code',
										'Date saisie',
										'Échéance',
										'Fournisseur',
										'Libellé',
										'Dernier Solde',
										'Emis Non Décaissé',
										'Solde après E.N.D.',
										'Découvert Autorisé',
										'Mobilisable',
										'Ordo',
										'Solde après Ordo',
										'Solde après Equi',
									],
									tableBody: bodyArray,
								}}
								headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
								headerHoverBackgroundColor='#1092B8'
								showPreviousNextButtons
								enableColumnSorting
								showItemsPerPageSelector
								showPagination
								itemsPerPageOptions={[5, 25, 50]}
								filterableColumns={[false, false, false, false, true, false, false, false, false, false, false]}
								language='fr'
								onRowClick={(index: number, rowData?: (string | undefined)[]) => {
									if (rowData && rowData[1]) {
										const cle = rowData[1]
										const rowDetails = getRowDetails(cle)
										if (rowDetails) {
											console.log('RowDetails :', rowDetails)

											navigate(`/commandes/tresorerie/details_facture_interco/`, {
												state: { fullRowDetails: rowDetails },
											})
										} else {
											console.error('Aucune prévision correspondante trouvée pour la clé:', cle)
										}
									}
								}}
							/>
						)}
					</div>
					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Equilibrages
