import './previsionAValider.scss'
import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'

const PrevisionAValider: () => ReactElement = (): ReactElement => {
	const navigate = useNavigate()

	// Mocked data (replace with API call later)
	const mockedPrevisions: IPrevision[] = [
		{
			cle: 'PREV001',
			societe: 'Société X',
			dateSaisie: '2024-01-01',
			dateEcheance: '2024-01-15',
			libelleCompteTiers: 'DESLANDES',
			libelleEcriture: 'HYGIENE 11 4124 SOLDE CDE N° 557',
			credit: '1000.0',
		},
		{
			cle: 'PREV002',
			societe: 'Société Y',
			dateSaisie: '2024-02-01',
			dateEcheance: '2024-02-20',
			libelleCompteTiers: 'IONOS',
			libelleEcriture: 'INFORMATIQUE 06 2T23 SOLDE CDE N° 273',
			credit: '500.0',
		},
		{
			cle: 'PREV003',
			societe: 'Société Z',
			dateSaisie: '2024-03-01',
			dateEcheance: '2024-03-15',
			libelleCompteTiers: 'SODEXO',
			libelleEcriture: 'TR 11 4T24 SOLDE CDE N° 556',
			credit: '1500.0',
		},
		{
			cle: 'PREV004',
			societe: 'Société A',
			dateSaisie: '2024-04-01',
			dateEcheance: '2024-04-15',
			libelleCompteTiers: 'GANDI SAS',
			libelleEcriture: 'INFORMATIQUE 08 3T23 SOLDE CDE N° 300',
			credit: '750.0',
		},
		{
			cle: 'PREV005',
			societe: 'Société B',
			dateSaisie: '2024-05-01',
			dateEcheance: '2024-05-15',
			libelleCompteTiers: 'OCTOPUSH',
			libelleEcriture: 'INFORMATIQUE 09 3T23 SOLDE CDE N° 318',
			credit: '1200.0',
		},
		{
			cle: 'PREV006',
			societe: 'Société C',
			dateSaisie: '2024-06-01',
			dateEcheance: '2024-06-15',
			libelleCompteTiers: 'ALIEXPRESS',
			libelleEcriture: 'INFORMATIQUE 10 4T24 SOLDE CDE N° 534',
			credit: '900.0',
		},
		{
			cle: 'PREV007',
			societe: 'Société D',
			dateSaisie: '2024-07-01',
			dateEcheance: '2024-07-15',
			libelleCompteTiers: 'AMAZON',
			libelleEcriture: 'DOCUMENTATION 11 4T24 SOLDE CDE N° 546',
			credit: '2000.0',
		},
		{
			cle: 'PREV008',
			societe: 'Société E',
			dateSaisie: '2024-08-01',
			dateEcheance: '2024-08-15',
			libelleCompteTiers: 'AMAZON',
			libelleEcriture: 'DOCUMENTATION 11 4T24 SOLDE CDE N° 546',
			credit: '2000.0',
		},
		{
			cle: 'PREV009',
			societe: 'Société F',
			dateSaisie: '2024-09-01',
			dateEcheance: '2024-09-15',
			libelleCompteTiers: 'DESLANDES',
			libelleEcriture: 'HYGIENE 11 4124 SOLDE CDE N° 557',
			credit: '1000.0',
		},
		{
			cle: 'PREV010',
			societe: 'Société G',
			dateSaisie: '2024-10-01',
			dateEcheance: '2024-10-15',
			libelleCompteTiers: 'IONOS',
			libelleEcriture: 'INFORMATIQUE 06 2T23 SOLDE CDE N° 273',
			credit: '500.0',
		},
		{
			cle: 'PREV011',
			societe: 'Société H',
			dateSaisie: '2024-11-01',
			dateEcheance: '2024-11-15',
			libelleCompteTiers: 'SODEXO',
			libelleEcriture: 'TR 11 4T24 SOLDE CDE N° 556',
			credit: '1500.0',
		},
		{
			cle: 'PREV012',
			societe: 'Société I',
			dateSaisie: '2024-12-01',
			dateEcheance: '2024-12-15',
			libelleCompteTiers: 'GANDI SAS',
			libelleEcriture: 'INFORMATIQUE 08 3T23 SOLDE CDE N° 300',
			credit: '750.0',
		},
		{
			cle: 'PREV013',
			societe: 'Société J',
			dateSaisie: '2025-01-01',
			dateEcheance: '2025-01-15',
			libelleCompteTiers: 'OCTOPUSH',
			libelleEcriture: 'INFORMATIQUE 09 3T23 SOLDE CDE N° 318',
			credit: '1200.0',
		},
		{
			cle: 'PREV014',
			societe: 'Société K',
			dateSaisie: '2025-02-01',
			dateEcheance: '2025-02-15',
			libelleCompteTiers: 'ALIEXPRESS',
			libelleEcriture: 'INFORMATIQUE 10 4T24 SOLDE CDE N° 534',
			credit: '900.0',
		},
		{
			cle: 'PREV015',
			societe: 'Société L',
			dateSaisie: '2025-03-01',
			dateEcheance: '2025-03-15',
			libelleCompteTiers: 'AMAZON',
			libelleEcriture: 'DOCUMENTATION 11 4T24 SOLDE CDE N° 546',
			credit: '2000.0',
		},
		{
			cle: 'PREV016',
			societe: 'Société M',
			dateSaisie: '2025-04-01',
			dateEcheance: '2025-04-15',
			libelleCompteTiers: 'AMAZON',
			libelleEcriture: 'DOCUMENTATION 11 4T24 SOLDE CDE N° 546',
			credit: '2000.0',
		},
		{
			cle: 'PREV017',
			societe: 'Société N',
			dateSaisie: '2025-05-01',
			dateEcheance: '2025-05-15',
			libelleCompteTiers: 'DESLANDES',
			libelleEcriture: 'HYGIENE 11 4124 SOLDE CDE N° 557',
			credit: '1000.0',
		},
	]

	// State for table data and filters
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [codeFilter, setCodeFilter] = useState('') // Only "Code" filter

	// Convert data for the table
	const convertToArray = (datas: IPrevision[]): string[][] =>
		datas
			.filter(
				(data) => !codeFilter || data.cle.toLowerCase().includes(codeFilter.toLowerCase()) // Case-insensitive filter
			)
			.map((data) => [
				data.societe || 'Non défini', // Société
				data.cle || 'Non défini', // Code
				data.dateSaisie || 'Non défini', // Date Saisie
				data.dateEcheance || 'Non défini', // Date Échéance
				data.libelleCompteTiers || 'Non défini', // Fournisseur
				data.libelleEcriture || 'Non défini', // Libellé écriture
				data.credit ? parseFloat(data.credit).toFixed(2) : '0.00', // Montant (parse string to number)
			])

	// Update table data with mocked data
	useEffect((): void => {
		setBodyArray(convertToArray(mockedPrevisions))
	}, [codeFilter])

	// Prepare table data
	const tableData = {
		tableHead: ['Société', 'Code', 'Date Saisie', 'Date Échéance', 'Fournisseur', 'Libellé écriture', 'Montant'],
		tableBody: bodyArray,
	}

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | PRÉVISIONS À VALIDER' }} />
			<main id='previsionAValider'>
				<section className='previsionAValider__bottomSection'>
					<div className='filtersWrapper'>
						<DateRange onFilter={() => {}} defaultMinDate={''} defaultMaxDate={''} />
						<div className='codeInputWrapper'>
							<label htmlFor='cle'>Code :</label>
							<input
								name='cle'
								type='text'
								placeholder='Filtrer par code'
								value={codeFilter}
								onChange={(e) => setCodeFilter(e.target.value)} // Update code filter
							/>
						</div>
					</div>
					<NRTL
						datas={tableData}
						headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
						headerHoverBackgroundColor='#1092B8'
						showPreviousNextButtons
						enableColumnSorting
						showItemsPerPageSelector
						showPagination
						itemsPerPageOptions={[5, 25, 50]}
						filterableColumns={[true, false, false, false, false, false, false]}
						language='fr'
						onRowClick={(index: number, rowData?: string[]) => {
							if (rowData) {
								// Create an object with field names as keys and row data as values
								const rowDetails = tableData.tableHead.reduce(
									(acc, field, i) => {
										acc[field] = rowData[i] // Assign each field name to its corresponding value
										return acc
									},
									{} as Record<string, string>
								)

								console.log('Clicked Row Details:', rowDetails) // Log the row details to the console
								// navigate(`/details_prevision_valider/${rowData[1]}`) // Navigate to details using Code
							}
						}}
					/>
					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default PrevisionAValider
