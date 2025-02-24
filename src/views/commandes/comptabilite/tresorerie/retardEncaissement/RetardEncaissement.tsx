import './retardEncaissement.scss'
import { convertFrDateToServerDate, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'
import { ReactElement, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Nrtl from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import { mockedEncaissements } from '../encaissements/mock/mockedEncaissements.ts'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'

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
	commentaire: string
}

const RetardEncaissement: React.FC = (): ReactElement => {
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
		const matchedRecette = mockedEncaissements.find((recette) => recette.cle.toLowerCase() === cle.toLowerCase())
		if (!matchedRecette) return undefined

		return {
			societe: matchedRecette.societe ?? 'Non défini',
			cle: matchedRecette.cle || 'Non défini',
			dateSaisie: matchedRecette.dateSaisie ?? 'Non défini',
			dateEcheance: matchedRecette.dateEcheance ?? 'Non défini',
			libelleCompteTiers: matchedRecette.libelleCompteTiers ?? 'Non défini',
			libelleEcriture: matchedRecette.libelleEcriture ?? 'Non défini',
			libelleEcritureBeneficiaire: matchedRecette.libelleEcritureBeneficiaire ?? 'Non défini',
			libelleEcritureTrimestre: matchedRecette.libelleEcritureTrimestre ?? 'Non défini',
			libelleEcritureAnnee: matchedRecette.libelleEcritureAnnee ?? 'Non défini',
			libelleEcritureMois: matchedRecette.libelleEcritureMois ?? 'Non défini',
			libelleEcriturePrefixe: matchedRecette.libelleEcriturePrefixe ?? 'Non défini',
			dateOrdo: matchedRecette.dateOrdo ?? 'Non défini',
			modeReglement: matchedRecette.modeReglement ?? 'Non défini',
			statut: matchedRecette.statut ?? 'Non défini',
			refSourceTiers: matchedRecette.refSourceTiers ?? 'Non défini',
			credit: matchedRecette.credit ? parseFloat(matchedRecette.credit).toFixed(2) : '0.00',
			debit: matchedRecette.debit ? parseFloat(matchedRecette.debit).toFixed(2) : '0.00',
			montant: matchedRecette.credit ? parseFloat(matchedRecette.credit).toFixed(2) : '0.00',
			rubriqueTreso: matchedRecette.rubriqueTreso ?? 'Non défini',
			nomFichier: matchedRecette.nomFichier ?? 'Non défini',
			commentaire: matchedRecette.commentaire ?? '',
		}
	}

	const [filters, setFilters] = useState({
		minDate: getDefaultDateMin(),
		maxDate: getDefaultDateMax(),
		cle: '',
		societe: '',
	})
	const [showModal, setShowModal] = useState(false)

	const navigate = useNavigate()

	const isDateRangeValid = (min: string, max: string): boolean => {
		if (!Date.parse(min) || !Date.parse(max)) {
			console.warn('Invalid date range.', { min, max })
			return false
		}
		const dateMin = new Date(min)
		const dateMax = new Date(max)
		return dateMin <= dateMax
	}

	const convertToArray = (datas: IPrevision[]): string[][] =>
		datas
			.filter((data) => !filters.cle || data.cle.toLowerCase().includes(filters.cle.toLowerCase()))
			.filter((data) => !filters.societe || data.societe === filters.societe)
			.map((data) => {
				const credit = data.credit ? parseFloat(data.credit) : 0
				const debit = data.debit ? parseFloat(data.debit) : 0

				let montant = 0
				if (credit !== 0) {
					montant = credit
				} else if (debit !== 0) {
					montant = -debit
				}
				return [
					data.cle || 'Non défini',
					data.dateSaisie ? convertENDateToFr(data.dateSaisie.split('/').reverse().join('-')) : 'Non défini',
					data.dateEcheance ? convertENDateToFr(data.dateEcheance.split('/').reverse().join('-')) : 'Non défini',
					data.dateOrdo ? convertENDateToFr(data.dateOrdo.split('/').reverse().join('-')) : 'Non défini',
					data.libelleCompteTiers ?? 'Non défini',
					data.rubriqueTreso ?? 'Non défini',
					data.libelleEcriture ?? 'Non défini',
					keepTwoDecimals(montant),
					// data.nomFichier ?? 'Aucun fichier joint',
				]
			})

	const keepTwoDecimals = (number: number): string =>
		new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number)

	const handleRowClick = (index: number, rowData?: string[]): void => {
		if (rowData?.[0]) {
			const cle = rowData[0]
			const rowDetails = getRowDetails(cle)

			if (rowDetails) {
				console.log('RowDetails:', rowDetails)

				navigate('/commandes/tresorerie/details_retard_encaissement', {
					state: { fullRowDetails: rowDetails },
				})
			} else {
				console.error('Aucune recette correspondante trouvée pour la clé:', cle)
			}
		} else {
			console.warn('No data available for this row.')
		}
	}

	const handleDateFilter = (minDate: string, maxDate: string): void => {
		const validMinDate = convertFrDateToServerDate(minDate)
		const validMaxDate = convertFrDateToServerDate(maxDate)

		if (!isDateRangeValid(validMinDate, validMaxDate)) {
			console.warn('Invalid date range.', { validMinDate, validMaxDate })
			return
		}

		setFilters({ ...filters, minDate: validMinDate, maxDate: validMaxDate })
	}

	const filteredData = useMemo(() => {
		return mockedEncaissements.filter((data) => {
			const dateEcheance = data.dateEcheance ? new Date(data.dateEcheance) : new Date()
			const minDate = new Date(filters.minDate)
			const maxDate = new Date(filters.maxDate)
			return dateEcheance >= minDate && dateEcheance <= maxDate
		})
	}, [filters, mockedEncaissements])

	const bodyArray = useMemo(() => convertToArray(filteredData), [filteredData])

	const tableData = {
		tableHead: ['Code', 'Date saisie', 'Échéance', 'Ordo', 'Fournisseur', 'Rubrique', 'Libellé écriture', 'Montant'],
		tableBody: bodyArray,
	}

	const societes = Array.from(new Set(mockedEncaissements.map((recette) => recette.societe)))

	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | RETARD ENCAISSEMENTS ${filters.societe}` }} />
			<main id='retardEncaissement'>
				<section className='retardEncaissement__bottomSection'>
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
							filterableColumns={[false, false, false, false, false, false, true, false]}
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

export default RetardEncaissement
