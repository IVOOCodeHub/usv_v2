import React, { ReactElement, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // If you're using routing
import Header from '../../../../../components/header/Header.tsx'
import Nrtl from '../../../../../components/NRTL/NRTL.tsx'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer.tsx'
import DateRange from '../../../../../components/dateRange/DateRange.tsx' // Assuming you have a DateRange component
import './encaissements.scss' // Create this file (see CSS below)

// Define an interface for your encaissement data
interface IEncaissement {
	id: string
	dateEncaissement: string
	montant: number
	modePaiement: string
	reference: string
	societe: string // Added societe
	// ... other properties
}

const Encaissements: () => ReactElement = (): ReactElement => {
	const navigate = useNavigate()

	// Default date functions (you'll need to implement these based on your date format)
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

	// State for encaissements data
	const [encaissements, setEncaissements] = useState<IEncaissement[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// State for filters
	const [filters, setFilters] = useState({
		minDate: getDefaultDateMin(),
		maxDate: getDefaultDateMax(),
		cle: '', // Assuming 'cle' maps to 'reference' or 'id'
		societe: '',
	})

	// Function to fetch encaissements data (replace with your API call)
	const fetchEncaissements = async () => {
		setLoading(true)
		try {
			// const response = await fetch('/api/encaissements'); // Replace with your API endpoint
			// const data: IEncaissement[] = await response.json();
			//Simulate API call with mocked data
			const mockedData: IEncaissement[] = [
				{
					id: '1',
					dateEncaissement: '2024-01-15',
					montant: 100,
					modePaiement: 'CB',
					reference: 'REF123',
					societe: 'GIVOO France',
				},
				{
					id: '2',
					dateEncaissement: '2024-02-20',
					montant: 250,
					modePaiement: 'Virement',
					reference: 'REF456',
					societe: 'GIVOO Germany',
				},
				{
					id: '3',
					dateEncaissement: '2024-03-10',
					montant: 120,
					modePaiement: 'CB',
					reference: 'REF789',
					societe: 'GIVOO France',
				},
				{
					id: '4',
					dateEncaissement: '2024-04-05',
					montant: 300,
					modePaiement: 'Virement',
					reference: 'REF101',
					societe: 'GIVOO Spain',
				},
			]
			setEncaissements(mockedData)
			setLoading(false)
		} catch (err: any) {
			setError(err.message || 'Failed to fetch encaissements.')
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchEncaissements()
	}, []) // Fetch data on initial load

	// Date Validation
	const isDateRangeValid = (min: string, max: string): boolean => {
		if (!Date.parse(min) || !Date.parse(max)) {
			console.warn('Invalid date range.', { min, max })
			return false
		}
		const dateMin = new Date(min)
		const dateMax = new Date(max)
		return dateMin <= dateMax
	}

	// Date Filter Handler
	const handleDateFilter = (minDate: string, maxDate: string): void => {
		// Assuming you have a function to convert the date format
		const validMinDate = convertFrDateToServerDate(minDate) // Replace with your date conversion
		const validMaxDate = convertFrDateToServerDate(maxDate) // Replace with your date conversion

		if (!isDateRangeValid(validMinDate, validMaxDate)) {
			console.warn('Invalid date range.', { validMinDate, validMaxDate })
			return
		}

		setFilters({ ...filters, minDate: validMinDate, maxDate: validMaxDate })
	}

	// Function to handle row click
	const handleRowClick = (index: number, rowData?: string[]) => {
		if (rowData?.[0]) {
			const encaissementId = rowData[0]
			// Navigate to details page (adjust the route as needed)
			navigate(`/encaissements/${encaissementId}`)
		}
	}

	// Function to convert dates to french format (replace with your implementation)
	const convertENDateToFr = (date: string): string => {
		// Implement your date conversion logic here
		return date // Placeholder
	}

	// Function to keep two decimals
	const keepTwoDecimals = (number: number): string =>
		new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number)

	// Data Transformation for Nrtl
	const convertToArray = (datas: IEncaissement[]): string[][] =>
		datas
			.filter((data) => !filters.cle || data.reference.includes(filters.cle) || data.id.includes(filters.cle)) //Adjusted for reference or ID
			.filter((data) => !filters.societe || data.societe === filters.societe)
			.filter((data) => {
				const encaissementDate = new Date(data.dateEncaissement) //Use dateEncaissement
				const minDate = new Date(filters.minDate)
				const maxDate = new Date(filters.maxDate)
				return encaissementDate >= minDate && encaissementDate <= maxDate
			})
			.map((data) => [
				data.id,
				convertENDateToFr(data.dateEncaissement), // Format the date
				keepTwoDecimals(data.montant), // Format the amount
				data.modePaiement,
				data.reference,
			])

	useEffect(() => {
		//Apply filters when encaissements or filters change
		if (encaissements) {
			setBodyArray(convertToArray(encaissements))
		}
	}, [encaissements, filters])

	const [bodyArray, setBodyArray] = useState<string[][]>([])

	// Prepare data for the table component (Nrtl)
	const tableData = {
		tableHead: ['ID', 'Date', 'Montant', 'Mode de Paiement', 'Référence'],
		tableBody: bodyArray,
	}

	//Get unique societes
	const societes = Array.from(new Set(encaissements.map((encaissement) => encaissement.societe)))

	//Conversion function placeholders
	function convertFrDateToServerDate(date: string | undefined): string {
		return date || ''
	}

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | ENCAISSEMENTS' }} />
			<main id='encaissements'>
				<section className='encaissements__bottomSection'>
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
								placeholder='Filtrer par référence'
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
							filterableColumns={[false, true, true, true, true]}
							language='fr'
							onRowClick={handleRowClick}
						/>
					)}

					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
						{/* Add other buttons as needed */}
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Encaissements
