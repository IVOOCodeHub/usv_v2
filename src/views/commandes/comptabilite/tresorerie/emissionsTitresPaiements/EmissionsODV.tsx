import './emissionsODV.scss'
import { convertFrDateToServerDate, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import Nrtl from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import ModalCourriersSansCourrier from '../previsionsOrdoSansCourrier/ModalCourriersSansCourrier.tsx'
import ModalAffichagePdf from '../previsionsOrdoSansCourrier/ModalAffichagePdf.tsx'
import { mockedPrevisions } from '../previsionAValider/mock/mockPrevValider.ts' // Import the mocked data

interface RowDetails {
	id: string
	societe: string
	dateEmission: string
	libelle: string
	montant: string
	statut: string
	nomFichier?: string
}

const EmissionsODV: () => ReactElement = (): ReactElement => {
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

	const getRowDetails = (id: string): RowDetails | undefined => {
		const matchedEmission = mockedPrevisions.find((emission) => emission.id === id)
		if (!matchedEmission) return undefined

		return {
			id: matchedEmission.id || 'Non défini',
			societe: matchedEmission.societe ?? 'Non défini',
			dateEmission: matchedEmission.dateEmission ?? 'Non défini',
			libelle: matchedEmission.libelle ?? 'Non défini',
			montant: matchedEmission.montant ? parseFloat(matchedEmission.montant).toFixed(2) : '0.00',
			statut: matchedEmission.statut ?? 'Non défini',
			nomFichier: matchedEmission.nomFichier ?? 'Non défini',
		}
	}

	// State for table data and filters
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [filters, setFilters] = useState({
		minDate: getDefaultDateMin(),
		maxDate: getDefaultDateMax(),
		id: '',
		societe: '',
	})
	const [showModalDetails, setShowModalDetails] = useState(false)
	const [showModalPdf, setShowModalPdf] = useState(false)
	const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null)

	// Navigation for redirection
	const navigate = useNavigate()

	const handleOpenPdf = (pdfUrl: string) => {
		setSelectedPdfUrl(pdfUrl)
		setShowModalDetails(false)
		setShowModalPdf(true)
	}

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
			.filter((data) => !filters.id || data.id.includes(filters.id)) // Filter by "ID"
			.filter((data) => !filters.societe || data.societe === filters.societe) // Filter by "Société"
			.map((data) => [
				data.id || 'Non défini',
				data.dateEmission ? convertENDateToFr(data.dateEmission.split('/').reverse().join('-')) : 'Non défini',
				data.libelle ?? 'Non défini',
				keepTwoDecimals(parseFloat(data.montant)),
				data.statut ?? 'Non défini',
			])

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
			const id = rowData[0] // Assuming the key is in the first column of the row
			const rowDetails = getRowDetails(id) // Fetch full row details using the key

			if (rowDetails) {
				console.log('RowDetails:', rowDetails)
				setShowModalDetails(true)
			} else {
				console.error("Aucune émission correspondante trouvée pour l'ID:", id)
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
		const filteredData = mockedPrevisions.filter((data) => {
			const dateEmission = new Date(data.dateEmission)
			const minDate = new Date(filters.minDate)
			const maxDate = new Date(filters.maxDate)
			return dateEmission >= minDate && dateEmission <= maxDate
		})
		setBodyArray(convertToArray(filteredData))
	}, [filters])

	// Prepare table data
	const tableData = {
		tableHead: ['ID', 'Date émission', 'Libellé', 'Montant', 'Statut'],
		tableBody: bodyArray,
	}

	// Unique sociétés for the dropdown
	const societes = Array.from(new Set(mockedPrevisions.map((emission) => emission.societe)))

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | ÉMISSIONS ODV' }} />
			<main id='emissionsODV'>
				<section className='emissionsODV__bottomSection'>
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
						<div className='idInputWrapper'>
							<label htmlFor='id'>ID :</label>
							<input
								name='id'
								type='text'
								placeholder='Filtrer par ID'
								value={filters.id}
								onChange={(e) => setFilters({ ...filters, id: e.target.value })}
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
							filterableColumns={[false, false, false, false, false]}
							language='fr'
							onRowClick={(index: number, rowData?: string[]) => handleRowClick(index, rowData)}
						/>
					)}
					{showModalDetails && !showModalPdf && (
						<ModalCourriersSansCourrier
							isOpen={showModalDetails}
							onClose={() => setShowModalDetails(false)}
							onOpenPdf={(pdfUrl) => {
								setSelectedPdfUrl(pdfUrl)
								setShowModalDetails(false)
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
								setShowModalDetails(true)
							}}
							onAssocier={() => {
								console.log('Associer le fichier PDF')
								setShowModalPdf(false)
								setShowModalDetails(true)
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

export default EmissionsODV
