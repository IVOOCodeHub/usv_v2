import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import { mockedInterco } from './mock/mockIntercoInvoices.ts'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import './facturationIntercoARegulariser.scss'

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
}

const FacturationIntercoARegulariser: React.FC = () => {
	const navigate = useNavigate()

	// State for table data and filters
	const [bodyArray, setBodyArray] = useState<(string | undefined)[][]>([])
	const [codeFilter, setCodeFilter] = useState('') // Only "Code" filter

	// Convert data for the table
	const convertToArray = (datas: IPrevision[]): (string | undefined)[][] => {
		return datas
			.filter((data) => data.cle.toLowerCase().includes(codeFilter.toLowerCase())) // Filter by "Code"
			.map((data) => [
				data.societe ?? 'Non défini', // CAGR
				data.cle || 'Non défini', // Bookfile
				data.dateSaisie ?? 'Non défini', // Toutes
				data.dateEcheance ?? 'Non défini', // Filter
				data.libelleCompteTiers ?? 'Non défini', // Dollar
				data.libelleEcriture ?? 'Non défini', // Libellé
				data.credit ? parseFloat(data.credit).toFixed(2) : '0.00', // Montant
				data.debit ? parseFloat(data.debit).toFixed(2) : '0.00', // Montant
				data.nomFichier ?? 'Non défini', // Courrier
			])
	}

	// Function to get row details
	const getRowDetails = (cle: string): RowDetails | undefined => {
		const matchedPrevision = mockedInterco.find((prevision) => prevision.cle === cle)
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
		}
	}

	// Update table data with mocked data
	useEffect(() => {
		setBodyArray(convertToArray(mockedInterco))
	}, [codeFilter])

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | FACTURATION INTERCO À RÉGULARISER' }} />
			<main id='facturationIntercoARegulariser'>
				<section className='facturationIntercoARegulariser__bottomSection'>
					<div className='filtersWrapper'>
						<DateRange onFilter={() => {}} defaultMinDate={''} defaultMaxDate={''} />
						<div className='codeInputWrapper'>
							<label htmlFor='cle'>Code :</label>
							<input
								name='cle'
								type='text'
								placeholder='Filtrer par code'
								value={codeFilter}
								onChange={(e) => setCodeFilter(e.target.value)}
							/>
						</div>
					</div>
					<div id='groupedTable'>
						{bodyArray.length === 0 ? (
							<div className='no-results'>Aucune prévision trouvée pour le code "{codeFilter}".</div>
						) : (
							<NRTL
								datas={{
									tableHead: [
										'INTERCO',
										'Code',
										'Date saisie',
										'Echéance',
										'Fournisseur',
										'Libellé',
										'Débit',
										'Crédit',
										'Courrier',
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
								filterableColumns={[false, false, false, false, true, false, false]}
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

export default FacturationIntercoARegulariser
