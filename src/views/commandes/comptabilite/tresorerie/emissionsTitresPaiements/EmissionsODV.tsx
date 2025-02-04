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

	// New fields from the ASP code
	ibanCible: string // IBAN of the recipient
	bicCible: string // BIC of the recipient
	ibanSource: string // IBAN of the issuer
	bicSource: string // BIC of the issuer
	libelleTiers: string // Description of the supplier
	noCompteBanque: string // Bank account number
	cleCourrier: string // Unique key for the payment
	ibanTiers: string // IBAN of the supplier (from fournisseurs table)
	bicTiers: string // BIC of the supplier (from fournisseurs table)
	nomBanque: string // Bank name (from banques_comptes_societes table)
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

	const [filters, setFilters] = useState({
		minDate: getDefaultDateMin(),
		maxDate: getDefaultDateMax(),
		id: '',
		societe: '',
	})

	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [showModalDetails, setShowModalDetails] = useState(false)
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

	// const isBankAccountValid = (noCompteBanque: string): boolean => {
	// 	if (!noCompteBanque) {
	// 		console.warn('Invalid bank account.', { noCompteBanque })
	// 		return false
	// 	}
	// }

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
					(!filters.id || data.refSourceTiers.toLowerCase().includes(filters.id.toLowerCase())) && // Case-insensitive filter by "Code" (refSourceTiers)
					(!filters.societe || data.societe === filters.societe) // Filter by "Société"
				)
			})
			.map((data) => {
				const credit = data.credit ? parseFloat(data.credit) : 0
				const debit = data.debit ? parseFloat(data.debit) : 0

				return [
					data.refSourceTiers ?? 'Non défini', // "Code" column
					data.cle || 'Non défini',
					data.dateOrdo ? convertENDateToFr(data.dateOrdo.split('/').reverse().join('-')) : 'Non défini',
					data.dateEcheance ? convertENDateToFr(data.dateEcheance.split('/').reverse().join('-')) : 'Non défini',
					data.libelleCompteTiers ?? 'Non défini',
					data.rubriqueTreso ?? 'Non défini',
					data.libelleEcriture ?? 'Non défini',
					keepTwoDecimals(credit !== 0 ? credit : debit !== 0 ? -debit : 0),
					data.noCompteBanque ? data.noCompteBanque.substring(15) : 'IBAN Inconnu',
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

	const getRowDetails = (refSourceTiers: string): RowDetails | undefined => {
		const matchedPrevision = mockedPrevisions.find((prevision) => prevision.refSourceTiers === refSourceTiers)
		if (!matchedPrevision) return undefined

		// Fetch additional data from the mocked data (replace with API calls if needed)
		const ibanCible = matchedPrevision.iban || 'Non défini' // Replace with actual logic
		const bicCible = matchedPrevision.bic || 'Non défini' // Replace with actual logic
		const ibanSource = matchedPrevision.noCompteBanque ? matchedPrevision.noCompteBanque.substring(15) : 'Non défini' // Extract IBAN from noCompteBanque
		const bicSource = 'Non défini' // Replace with actual logic
		const libelleTiers = matchedPrevision.libelleCompteTiers || 'Non défini'
		const noCompteBanque = matchedPrevision.noCompteBanque || 'Non défini'
		const cleCourrier = matchedPrevision.cle || 'Non défini'
		const ibanTiers = matchedPrevision.iban || 'Non défini' // Replace with actual logic
		const bicTiers = matchedPrevision.bic || 'Non défini' // Replace with actual logic
		const nomBanque = matchedPrevision.noCompteBanque ? matchedPrevision.noCompteBanque.split(' - ')[0] : 'Non défini' // Extract bank name from noCompteBanque

		return {
			...matchedPrevision,
			ibanCible,
			bicCible,
			ibanSource,
			bicSource,
			libelleTiers,
			noCompteBanque,
			cleCourrier,
			ibanTiers,
			bicTiers,
			nomBanque,
		}
	}

	// Handle row click for navigation
	const handleRowClick = (index: number, rowData?: string[]): void => {
		if (rowData && rowData[0]) {
			const refSourceTiers = rowData[0] // Assuming the first column contains the refSourceTiers
			const rowDetails = getRowDetails(refSourceTiers)

			if (rowDetails) {
				navigate('/commandes/tresorerie/virement-modif-iban', { state: { prevision: rowDetails } })
				console.log('RowDetails:', rowDetails)
			} else {
				console.error("Aucune émission correspondante trouvée pour l'ID:", refSourceTiers)
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
	}, [filters.minDate, filters.maxDate, filters.id, filters.societe]) // Add filters.id and filters.societe to dependencies

	// Prepare table data
	const tableData = {
		tableHead: ['Code', 'Prevision', 'Echéance', 'Ordo.', 'Fournisseur', 'Rubrique', 'Libellé', 'Montant', 'Banque'],
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
							<label htmlFor='id'>Référence Paiement :</label>
							<input
								name='id'
								type='text'
								placeholder='Code'
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
