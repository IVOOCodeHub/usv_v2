import './GestionEcheancier.scss'
import { convertFrDateToServerDate } from '../../../../../utils/scripts/utils.ts'
import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import Nrtl from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import { mockedEcheances } from './mock/mockEcheances.ts' // Import the mocked data

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
	frequence: string
	jourMouvement: string
	dateDebut: string
	nomBanque: string
	noCompte: string
	contratTiers: string
}

const GestionEcheancier: () => ReactElement = (): ReactElement => {
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
		const matchedPrevision = mockedEcheances.find((prevision) => prevision.cle === cle)
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
			modeReglement: matchedPrevision.modeReglement ?? 'Non défini',
			statut: matchedPrevision.statut ?? 'Non défini',
			refSourceTiers: matchedPrevision.refSourceTiers ?? 'Non défini',
			credit: matchedPrevision.credit ? parseFloat(matchedPrevision.credit).toFixed(2) : '0.00',
			debit: matchedPrevision.debit ? parseFloat(matchedPrevision.debit).toFixed(2) : '0.00',
			montant: matchedPrevision.credit ? parseFloat(matchedPrevision.credit).toFixed(2) : '0.00',
			rubriqueTreso: matchedPrevision.rubriqueTreso ?? 'Non défini',
			nomFichier: matchedPrevision.nomFichier ?? 'Non défini',
			frequence: matchedPrevision.frequence ?? 'Non défini',
			jourMouvement: matchedPrevision.jourMouvement ?? 'Non défini',
			dateDebut: matchedPrevision.dateDebut ?? 'Non défini',
			nomBanque: matchedPrevision.nomBanque ?? 'Non défini',
			noCompte: matchedPrevision.noCompte ?? 'Non défini',
			contratTiers: matchedPrevision.contratTiers ?? 'Non défini',
		}
	}

	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [filters, setFilters] = useState({
		minDate: getDefaultDateMin(),
		maxDate: getDefaultDateMax(),
		cle: '',
		societe: '',
	})

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
			.filter((data) => !filters.cle || data.cle.includes(filters.cle))
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
					data.libelleCompteTiers ?? 'Non défini',
					data.rubriqueTreso ?? 'Non défini',
					data.nomBanque ?? 'Non défini',
					data.nomFichier ?? 'Aucun fichier joint',
					data.frequence ?? 'Non défini',
					data.jourMouvement ?? 'Non défini',
					data.noCompte ?? 'Non défini',
					keepTwoDecimals(montant),
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

				navigate('/commandes/tresorerie/details_echeancier', {
					state: { fullRowDetails: rowDetails },
				})
			} else {
				console.error('Aucune prévision correspondante trouvée pour la clé:', cle)
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

	useEffect(() => {
		const filteredData = mockedEcheances.filter((data) => {
			const dateEcheance = data.dateEcheance ? new Date(data.dateEcheance) : new Date()
			const minDate = new Date(filters.minDate)
			const maxDate = new Date(filters.maxDate)
			return dateEcheance >= minDate && dateEcheance <= maxDate
		})
		setBodyArray(convertToArray(filteredData))
	}, [filters])

	const tableData = {
		tableHead: ['Clé', 'Tiers', 'Contrat', 'Banque débitée', 'Fréquence', 'Jour', 'Libellé', 'Montant', 'Statut'],
		tableBody: bodyArray,
	}

	const societes = Array.from(new Set(mockedEcheances.map((prev) => prev.societe)))

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | GESTION ÉCHÉANCIER' }} />
			<main id='gestionEcheancier'>
				<section className='gestionEcheancier__bottomSection'>
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
							filterableColumns={[false, false, false, false, false, false, false, false, false]}
							language='fr'
							onRowClick={(index: number, rowData?: string[]) => handleRowClick(index, rowData)}
						/>
					)}
					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
						<Button
							props={{
								style: 'blue',
								text: 'Création',
								type: 'button',
								onClick: () => navigate('/commandes/tresorerie/creation_echeancier'),
							}}
						/>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default GestionEcheancier
