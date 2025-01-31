import './previsionOrdoSansCourrier.scss'
import { convertFrDateToServerDate, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'
import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import Nrtl from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import ModalCourriersSansCourrier from './ModalCourriersSansCourrier.tsx'
import ModalAffichagePdf from './ModalAffichagePdf.tsx'
import { mockedPrevisions } from '../previsionAValider/mock/mockPrevValider.ts' // Import the mocked data

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
}

const PrevisionOrdoSansCourrier: () => ReactElement = (): ReactElement => {
	// Default date values
	const getDefaultDateMin = (): string => {
		const now = new Date()
		const lastYear = now.getFullYear() - 1
		const firstDayLastYear = new Date(Date.UTC(lastYear, 0, 1, 0, 0, 0))
		return firstDayLastYear.toISOString().split('T')[0]
	}

	const getDefaultDateMax = (): string => {
		const now = new Date()
		const lastDayCurrentYear = new Date(Date.UTC(now.getFullYear(), 11, 31, 23, 59, 59))
		return lastDayCurrentYear.toISOString().split('T')[0]
	}

	const [filters, setFilters] = useState({
		minDate: getDefaultDateMin(),
		maxDate: getDefaultDateMax(),
		cle: '',
		societe: '',
	})

	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [showModalCourriers, setShowModalCourriers] = useState(false)
	const [showModalPdf, setShowModalPdf] = useState(false)
	const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null)
	const navigate = useNavigate()

	// Check if a date range is valid
	const isDateRangeValid = (min: string, max: string): boolean => {
		if (!Date.parse(min) || !Date.parse(max)) {
			console.warn('Invalid date range.', { min, max })
			return false
		}
		const dateMin = new Date(min)
		const dateMax = new Date(max)
		return dateMin <= dateMax
	}

	// Convert data for the table
	const convertToArray = (datas: IPrevision[]): string[][] =>
		datas
			.filter((data) => {
				const dateEcheance = new Date(data.dateEcheance)
				const minDate = new Date(filters.minDate)
				const maxDate = new Date(filters.maxDate)
				return (
					dateEcheance >= minDate &&
					dateEcheance <= maxDate &&
					(!filters.cle || data.cle.toLowerCase().includes(filters.cle.toLowerCase())) && // Case-insensitive filter by "Code"
					(!filters.societe || data.societe === filters.societe) // Filter by "Société"
				)
			})
			.map((data) => {
				const credit = data.credit ? parseFloat(data.credit) : 0
				const debit = data.debit ? parseFloat(data.debit) : 0

				return [
					data.cle || 'Non défini',
					data.dateOrdo ? convertENDateToFr(data.dateOrdo.split('/').reverse().join('-')) : 'Non défini',
					data.libelleCompteTiers ?? 'Non défini',
					data.rubriqueTreso ?? 'Non défini',
					data.libelleEcriture ?? 'Non défini',
					keepTwoDecimals(credit !== 0 ? credit : debit !== 0 ? -debit : 0),
				]
			})

	// Format amounts in euros
	const keepTwoDecimals = (number: number): string =>
		new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number)

	// Handle row click for navigation
	const handleRowClick = (index: number, rowData?: string[]): void => {
		if (rowData && rowData[0]) {
			const cle = rowData[0]
			const rowDetails = getRowDetails(cle)

			if (rowDetails) {
				console.log('RowDetails:', rowDetails)
				setShowModalCourriers(true)
			} else {
				console.error('Aucune prévision correspondante trouvée pour la clé:', cle)
			}
		} else {
			console.warn('No data available for this row.')
		}
	}

	// Handle date filter changes
	const handleDateFilter = (minDate: string, maxDate: string): void => {
		const validMinDate = convertFrDateToServerDate(minDate)
		const validMaxDate = convertFrDateToServerDate(maxDate)

		if (!isDateRangeValid(validMinDate, validMaxDate)) {
			console.warn('Invalid date range.', { validMinDate, validMaxDate })
			return
		}

		setFilters({ ...filters, minDate: validMinDate, maxDate: validMaxDate })
	}

	// Update table data when filters change
	useEffect(() => {
		const filteredData = mockedPrevisions
		setBodyArray(convertToArray(filteredData))
	}, [filters.minDate, filters.maxDate, filters.cle, filters.societe]) // Add filters.cle and filters.societe to dependencies

	// Prepare table data
	const tableData = {
		tableHead: ['Code', 'Date ordo.', 'Fournisseur', 'Rubrique', 'libellé', 'Montant'],
		tableBody: bodyArray,
	}

	// Unique sociétés for the dropdown
	const societes = Array.from(new Set(mockedPrevisions.map((prev) => prev.societe)))

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | PRÉVISIONS ORDONNANCÉES SANS COURRIER' }} />
			<main id='previsionOrdoSansCourrier'>
				<section className='previsionOrdoSansCourrier__bottomSection'>
					<div className='filtersWrapper'>
						<DateRange onFilter={handleDateFilter} defaultMinDate={filters.minDate} defaultMaxDate={filters.maxDate} />
						<div className='societeSelectWrapper'>
							<label htmlFor='societe'>Société :</label>
							<select
								name='societe'
								value={filters.societe}
								onChange={(e) => setFilters({ ...filters, societe: e.target.value })}
							>
								<option value=''>Choisir une société</option>
								{societes.map((societe) => (
									<option key={societe} value={societe}>
										{societe}
									</option>
								))}
							</select>
						</div>
						<div className='codeInputWrapper'>
							<label htmlFor='cle'>Code :</label>
							<input
								name='cle'
								type='text'
								placeholder='Filtrer par code'
								value={filters.cle}
								onChange={(e) => setFilters({ ...filters, cle: e.target.value })}
							/>
						</div>
					</div>
					{!filters.societe ? (
						<div className='no-societe-message'>Merci de choisir une société</div>
					) : (
						<Nrtl
							datas={tableData}
							headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
							headerHoverBackgroundColor='#1092B8'
							showPreviousNextButtons
							enableColumnSorting
							showItemsPerPageSelector
							showPagination
							itemsPerPageOptions={[5, 25, 50]}
							filterableColumns={[false, false, false, false, false, false]}
							language='fr'
							onRowClick={(index: number, rowData?: string[]) => handleRowClick(index, rowData)}
						/>
					)}
					{showModalCourriers && !showModalPdf && (
						<ModalCourriersSansCourrier
							isOpen={showModalCourriers}
							onClose={() => setShowModalCourriers(false)}
							onOpenPdf={(pdfUrl) => {
								setSelectedPdfUrl(pdfUrl)
								setShowModalCourriers(false)
								setShowModalPdf(true)
							}}
							userCredentials={null}
							previsionCode=''
						/>
					)}

					{showModalPdf && selectedPdfUrl && (
						<ModalAffichagePdf
							isOpen={showModalPdf}
							pdfUrl={selectedPdfUrl}
							onClose={() => {
								setShowModalPdf(false)
								setShowModalCourriers(true)
							}}
							onAssocier={() => {
								console.log('Associer le fichier PDF')
								setShowModalPdf(false)
								setShowModalCourriers(true)
							}}
						/>
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

export default PrevisionOrdoSansCourrier
