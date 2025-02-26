import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Nrtl from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import './equilibrages.scss'
import { mockedEquilibrages } from './mock/mockedEquilibrages'

interface RowDetails {
	banque: string
	dernierImport: string
	compte: string
	societe: string
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
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [totals, setTotals] = useState({
		emisNonDecaisse: '0.00',
		mobilisable: '0.00',
		ordo: '0.00',
		soldeApresOrdo: '0.00',
	})

	// Convert data for the table
	const convertToArray = (datas: RowDetails[]): string[][] => {
		return datas.map((data) => [
			data.banque || 'Non défini', // Banque
			data.dernierImport || 'Non défini', // Der.Import
			data.compte || 'Non défini', // Compte
			data.societe || 'Non défini', // Société
			parseFloat(data.dernierSolde || '0').toFixed(2), // Dernier Solde
			parseFloat(data.emisNonDecaisse || '0').toFixed(2), // Emis Non Décaissé
			parseFloat(data.soldeApresEND || '0').toFixed(2), // Solde après E.N.D.
			parseFloat(data.decouvertAutorise || '0').toFixed(2), // Découvert Autorisé
			parseFloat(data.mobilisable || '0').toFixed(2), // Mobilisable
			parseFloat(data.ordo || '0').toFixed(2), // Ordo
			parseFloat(data.soldeApresOrdo || '0').toFixed(2), // Solde après Ordo
			parseFloat(data.soldeApresEqui || '0').toFixed(2), // Solde après Equi
		])
	}

	// Function to get row details
	const getRowDetails = (compte: string): RowDetails | undefined => {
		const matchedPrevision = mockedEquilibrages.find((prevision) => prevision.compte === compte)
		if (!matchedPrevision) return undefined

		return {
			banque: matchedPrevision.banque ?? 'Non défini',
			dernierImport: matchedPrevision.dernierImport ?? 'Non défini',
			compte: matchedPrevision.compte || 'Non défini',
			societe: matchedPrevision.societe ?? 'Non défini',
			dernierSolde: parseFloat(matchedPrevision.dernierSolde || '0').toFixed(2),
			emisNonDecaisse: parseFloat(matchedPrevision.emisNonDecaisse || '0').toFixed(2),
			soldeApresEND: parseFloat(matchedPrevision.soldeApresEND || '0').toFixed(2),
			decouvertAutorise: parseFloat(matchedPrevision.decouvertAutorise || '0').toFixed(2),
			mobilisable: parseFloat(matchedPrevision.mobilisable || '0').toFixed(2),
			ordo: parseFloat(matchedPrevision.ordo || '0').toFixed(2),
			soldeApresOrdo: parseFloat(matchedPrevision.soldeApresOrdo || '0').toFixed(2),
			soldeApresEqui: parseFloat(matchedPrevision.soldeApresEqui || '0').toFixed(2),
		}
	}

	// Update table data with mocked data
	useEffect(() => {
		setBodyArray(convertToArray(mockedEquilibrages))
	}, [])

	// Calculate totals
	useEffect(() => {
		const totals = {
			emisNonDecaisse: mockedEquilibrages
				.reduce((prev, curr) => prev + parseFloat(curr.emisNonDecaisse || '0'), 0)
				.toFixed(2),
			mobilisable: mockedEquilibrages.reduce((prev, curr) => prev + parseFloat(curr.mobilisable || '0'), 0).toFixed(2),
			ordo: mockedEquilibrages.reduce((prev, curr) => prev + parseFloat(curr.ordo || '0'), 0).toFixed(2),
			soldeApresOrdo: mockedEquilibrages
				.reduce((prev, curr) => prev + parseFloat(curr.soldeApresOrdo || '0'), 0)
				.toFixed(2),
		}
		setTotals(totals)
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
							<Nrtl
								datas={{
									tableHead: [
										'Banque',
										'Der.Import',
										'Compte',
										'Société',
										'Dernier Solde Importé',
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
								itemsPerPageOptions={[10, 25]}
								filterableColumns={[false, false, false, false, false, false, false, false, false, false, false]}
								language='fr'
								onRowClick={(_, rowData?: string[]) => {
									if (rowData?.[2]) {
										const compte = rowData[2]
										const rowDetails = getRowDetails(compte)
										if (rowDetails) {
											console.log('RowDetails :', rowDetails)

											navigate(`/commandes/tresorerie/details_facture_interco/`, {
												state: { fullRowDetails: rowDetails },
											})
										} else {
											console.error('Aucune prévision correspondante trouvée pour la clé:', compte)
										}
									}
								}}
							/>
						)}
						<div className='totals'>
							<div>Total Emis Non Décaissé: {parseFloat(totals.emisNonDecaisse).toFixed(2)}</div>
							<div>Total Mobilisable: {parseFloat(totals.mobilisable).toFixed(2)}</div>
							<div>Total Ordo: {parseFloat(totals.ordo).toFixed(2)}</div>
							<div>Total Solde après Ordo: {parseFloat(totals.soldeApresOrdo).toFixed(2)}</div>
						</div>
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
