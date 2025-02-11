import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import { mockedEmisNonDecaisses } from './mock/mockEmisNonDecaisses.ts'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import './emisNonDecaisses.scss'

interface RowDetails {
	reference_paiement: string
	societe: string
	nom_banque_source: string
	nom_societe_tiers: string
	libelle: string
	mode_paiement: string
	date_echeance: string
	montant: string
	dh_statut: string
}

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
					data.reference_paiement ?? 'Non défini', // ✅ FIXED: Use correct field name
					data.nom_banque_source ?? 'Non défini',
					data.nom_societe_tiers ?? 'Non défini',
					data.libelle ?? 'Non défini',
					data.mode_paiement ?? 'Non défini',
					data.date_echeance ?? 'Non défini',
					data.montant ? parseFloat(data.montant).toFixed(2) : '0.00',
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
		const filteredData = mockedEmisNonDecaisses.filter(
			(data) =>
				(!filters.code || data.reference_paiement.toLowerCase().includes(filters.code.toLowerCase())) &&
				(!filters.minDate || new Date(data.date_echeance) >= new Date(filters.minDate)) &&
				(!filters.maxDate || new Date(data.date_echeance) <= new Date(filters.maxDate))
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

	const getRowDetails = (cle: string): RowDetails | undefined => {
		const matchedEmis = mockedEmisNonDecaisses.find((emis) => emis.reference_paiement === cle)
		if (!matchedEmis) return undefined

		return {
			reference_paiement: matchedEmis.reference_paiement ?? 'Non défini',
			societe: matchedEmis.societe ?? 'Non défini',
			nom_banque_source: matchedEmis.nom_banque_source ?? 'Non défini',
			nom_societe_tiers: matchedEmis.nom_societe_tiers ?? 'Non défini',
			libelle: matchedEmis.libelle ?? 'Non défini',
			mode_paiement: matchedEmis.mode_paiement ?? 'Non défini',
			date_echeance: matchedEmis.date_echeance ?? 'Non défini',
			montant: matchedEmis.montant ?? 'Non défini',
			dh_statut: matchedEmis.dh_statut ?? 'Non défini',
		}
	}

	const handleRowClick = (index: number, rowData?: string[]) => {
		if (!rowData) {
			console.warn('⚠️ No row data received')
			return
		}

		const cle = rowData[0]
		console.log('🛠️ Clicked Row Data:', rowData)
		console.log('🔑 Extracted Clé:', cle)

		const rowDetails = getRowDetails(cle)

		if (!rowDetails) {
			console.error('❌ No matching row found for clé:', cle)
			return
		}

		console.log('✅ Row details:', rowDetails)
	}

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | ÉMIS NON DÉCAISSÉS' }} />
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
										tableHead: ['Clé', 'Banque', 'Tiers', 'Libellé', 'Mode', 'Emis le', 'Montant'],
										tableBody: rows,
									}}
									headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
									headerHoverBackgroundColor='#1092B8'
									showPreviousNextButtons
									enableColumnSorting
									showItemsPerPageSelector
									showPagination
									itemsPerPageOptions={[5, 25, 50]}
									filterableColumns={[false, false, false, false, false, false, false]}
									language='fr'
									onRowClick={(index: number, rowData?: string[]) => handleRowClick(index, rowData)}
								/>
							</div>
						))
					)}

					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default EmisNonDecaisses
