import './previsionsEnRetard.scss'
import { convertFrDateToServerDate, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'
import { ReactElement, useEffect, useState } from 'react'
// import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import Nrtl from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
// import { UserContext } from '../../../../../context/userContext.tsx'
// import { LoaderContext } from '../../../../../context/loaderContext.tsx'
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
	// no_compte_banque: string
	modeReglement: string
	statut: string
	refSourceTiers: string
}

const PrevisionsEnRetard: () => ReactElement = (): ReactElement => {
	// Contexts for user data and loading state
	// const { userCredentials } = useContext(UserContext)
	// const { startLoading, stopLoading } = useContext(LoaderContext)

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

	const getRowDetails = (cle: string): RowDetails | undefined => {
		const matchedPrevision = mockedPrevisions.find((prevision) => prevision.cle === cle)
		if (!matchedPrevision) return undefined

		return {
			societe: matchedPrevision.societe ?? 'Non défini',
			cle: matchedPrevision.cle || 'Non défini',
			dateSaisie: matchedPrevision.dateSaisie ?? 'Non défini',
			dateEcheance: matchedPrevision.dateEcheance ?? 'Non défini',
			libelleCompteTiers: matchedPrevision.libelleCompteTiers ?? 'Non défini',
			libelleEcriture: matchedPrevision.libelleEcriture ?? 'Non défini',
			libelleEcritureBeneficiaire: matchedPrevision.libelleEcritureBeneficiaire ?? 'Non défini',
			libelleEcritureTrimestre: matchedPrevision.libelleEcritureTrimestre ?? 'Non défini',
			libelleEcritureAnnee: matchedPrevision.libelleEcritureAnnee ?? 'Non défini',
			libelleEcritureMois: matchedPrevision.libelleEcritureMois ?? 'Non défini',
			libelleEcriturePrefixe: matchedPrevision.libelleEcriturePrefixe ?? 'Non défini',
			dateOrdo: matchedPrevision.dateOrdo ?? 'Non défini',
			// no_compte_banque: matchedPrevision.no_compte_banque ?? 'Non défini',
			modeReglement: matchedPrevision.modeReglement ?? 'Non défini',
			statut: matchedPrevision.statut ?? 'Non défini',
			refSourceTiers: matchedPrevision.refSourceTiers ?? 'Non défini',
			credit: matchedPrevision.credit ? parseFloat(matchedPrevision.credit).toFixed(2) : '0.00',
			debit: matchedPrevision.debit ? parseFloat(matchedPrevision.debit).toFixed(2) : '0.00',
			montant: matchedPrevision.credit ? parseFloat(matchedPrevision.credit).toFixed(2) : '0.00',
			rubriqueTreso: matchedPrevision.rubriqueTreso ?? 'Non défini',
			nomFichier: matchedPrevision.nomFichier ?? 'Non défini',
		}
	}

	// State for table data and filters
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [filters, setFilters] = useState({
		minDate: getDefaultDateMin(),
		maxDate: getDefaultDateMax(),
		cle: '',
		societe: '', // Added société filter
	})

	// Navigation for redirection
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
			.filter((data) => !filters.cle || data.cle.includes(filters.cle)) // Filter by "Code"
			.filter((data) => !filters.societe || data.societe === filters.societe) // Filter by "Société"
			.map((data) => {
				const credit = data.credit ? parseFloat(data.credit) : 0
				const debit = data.debit ? parseFloat(data.debit) : 0

				let montant = 0;
				if (credit !== 0) {
					montant = credit;
				} else if (debit !== 0) {
					montant = -debit;
				}
				return [
					data.cle || 'Non défini',
					data.dateOrdo ? convertENDateToFr(data.dateOrdo.split('/').reverse().join('-')) : 'Non défini',
					data.dateEcheance ? convertENDateToFr(data.dateEcheance.split('/').reverse().join('-')) : 'Non défini',
					data.libelleCompteTiers ?? 'Non défini',
					data.rubriqueTreso ?? 'Non défini',
					data.libelleEcriture ?? 'Non défini',
					keepTwoDecimals(montant),
					data.nomFichier ?? 'Aucun fichier joint', // Added "Courrier" column
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
		if (rowData?.[0]) {
			const cle = rowData[0] // Assuming the key is in the second column of the row
			const rowDetails = getRowDetails(cle) // Fetch full row details using the key

			if (rowDetails) {
				console.log('RowDetails:', rowDetails)

				navigate('/commandes/tresorerie/details_prevision_retard', {
					state: { fullRowDetails: rowDetails }, // Pass full row details to the details page
				})
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
		const filteredData = mockedPrevisions.filter((data) => {
			const dateEcheance = data.dateEcheance ? new Date(data.dateEcheance) : new Date()
			const minDate = new Date(filters.minDate)
			const maxDate = new Date(filters.maxDate)
			return dateEcheance >= minDate && dateEcheance <= maxDate
		})
		setBodyArray(convertToArray(filteredData))
	}, [filters])

	// Prepare table data
	const tableData = {
		tableHead: ['Code', 'Date saisie', 'Échéance', 'Fournisseur', 'Rubrique', 'libellé', 'Montant', 'Courrier'], // Updated table headers
		tableBody: bodyArray,
	}

	// Unique sociétés for the dropdown
	const societes = Array.from(new Set(mockedPrevisions.map((prev) => prev.societe)))

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | PRÉVISIONS EN RETARD' }} />
			<main id='previsionsEnRetard'>
				<section className='previsionsEnRetard__bottomSection'>
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
							filterableColumns={[false, false, false, true, false, false, false]} // Updated filterable columns
							language='fr'
							onRowClick={(index: number, rowData?: string[]) => handleRowClick(index, rowData)}
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

export default PrevisionsEnRetard
