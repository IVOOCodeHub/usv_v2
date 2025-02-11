import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import { mockedPrevisions } from '../previsionAValider/mock/mockPrevValider.ts'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import './emisNonDecaisses.scss'
// import '../previsionAOrdonnancer/previsionAOrdonnancer.scss'

const EmisNonDecaisses: React.FC = () => {
	const navigate = useNavigate()

	// Filters & State
	const [bodyArray, setBodyArray] = useState<{ societe: string; rows: (string | undefined)[][] }[]>([])
	const [filters, setFilters] = useState({
		minDate: '',
		maxDate: '',
		code: '',
	})

	// Convert Data to Group by "Société"
	const convertToArrayWithGrouping = (datas: IPrevision[]): { societe: string; rows: (string | undefined)[][] }[] => {
		const groupedData = datas.reduce(
			(acc, data) => {
				const societe = data.societe ?? 'Non défini'
				if (!acc[societe]) {
					acc[societe] = []
				}
				acc[societe].push([
					data.cle || 'Non défini',
					data.dateSaisie ?? 'Non défini',
					data.dateEcheance ?? 'Non défini',
					data.libelleCompteTiers ?? 'Non défini',
					data.libelleEcriture ?? 'Non défini',
					data.credit ? parseFloat(data.credit).toFixed(2) : '0.00',
					data.nomFichier ?? 'Non défini',
				])
				return acc
			},
			{} as Record<string, (string | undefined)[][]>
		)

		return Object.entries(groupedData).map(([societe, rows]) => ({
			societe,
			rows,
		}))
	}

	// Filtering Logic
	useEffect(() => {
		const filteredData = mockedPrevisions.filter(
			(data) =>
				(!filters.code || data.cle.toLowerCase().includes(filters.code.toLowerCase())) &&
				(!filters.minDate || new Date(data.dateOrdo) >= new Date(filters.minDate)) &&
				(!filters.maxDate || new Date(data.dateOrdo) <= new Date(filters.maxDate))
		)

		setBodyArray(convertToArrayWithGrouping(filteredData))
	}, [filters])

	// Handle Date Filtering
	const handleDateFilter = (minDate: string, maxDate: string) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			minDate,
			maxDate,
		}))
	}

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | ÉMISSIONS NON DÉCAISSÉES' }} />
			<main id='emisNonDecaisses'>
				<section className='emisNonDecaisses__bottomSection'>
					<div className='filtersWrapper'>
						<DateRange
							labelMini='Date mini'
							labelMaxi='Date maxi'
							onFilter={handleDateFilter}
							defaultMinDate={filters.minDate}
							defaultMaxDate={filters.maxDate}
						/>
						<div className='codeInputWrapper'>
							<label htmlFor='code'>Code :</label>
							<input
								name='code'
								type='text'
								placeholder='Filtrer par code'
								value={filters.code}
								onChange={(e) => setFilters({ ...filters, code: e.target.value })}
							/>
						</div>
					</div>

					{/* Render each Société as a separate table */}
					{bodyArray.length === 0 ? (
						<div className='no-results'>Aucune émission trouvée pour ces critères.</div>
					) : (
						bodyArray.map(({ societe, rows }, index) => (
							<div key={index} className='grouped-table'>
								<h2>{societe}</h2>
								<NRTL
									datas={{
										tableHead: [
											'Code',
											'Date Saisie',
											'Date Échéance',
											'Fournisseur',
											'Libellé',
											'Montant',
											'Courrier',
										],
										tableBody: rows,
									}}
									headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
									headerHoverBackgroundColor='#1092B8'
									showPreviousNextButtons
									enableColumnSorting
									showItemsPerPageSelector
									showPagination
									itemsPerPageOptions={[5, 25, 50]}
									filterableColumns={[true, false, false, false, false, false, false]}
									language='fr'
									onRowClick={(index: number, rowData?: (string | undefined)[]) => {
										if (rowData && rowData[0]) {
											const cle = rowData[0]
											console.log('Navigating with:', cle)
											navigate(`/commandes/tresorerie/details_emission/`, {
												state: { cle },
											})
										}
									}}
								/>
							</div>
						))
					)}

					<div className='greyButtonWrapper'>
						<Button style='grey' text='Retour' type='button' onClick={() => navigate(-1)} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default EmisNonDecaisses
