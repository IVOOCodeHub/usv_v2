import './validationODV.scss'
import { convertFrDateToServerDate, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'
import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import Nrtl from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import { mockedPrevisions } from '../previsionAValider/mock/mockPrevValider.ts'

const ValidationODV: () => ReactElement = (): ReactElement => {
	const getDefaultDateMin = (): string =>
		new Date(Date.UTC(new Date().getFullYear() - 1, 0, 1)).toISOString().split('T')[0]
	const getDefaultDateMax = (): string =>
		new Date(Date.UTC(new Date().getFullYear(), 11, 31)).toISOString().split('T')[0]

	const [filters, setFilters] = useState({
		minDate: getDefaultDateMin(),
		maxDate: getDefaultDateMax(),
		id: '',
		societe: '',
	})

	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [confirmedRows, setConfirmedRows] = useState<Set<string>>(new Set())
	const [confirmationPopup, setConfirmationPopup] = useState<{ show: boolean; rowData: string[] | null }>({
		show: false,
		rowData: null,
	})
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const navigate = useNavigate()

	const convertToArray = (datas: IPrevision[]): string[][] =>
		datas
			.filter((data) => !confirmedRows.has(data.cle)) // Exclude confirmed rows
			.filter((data) => {
				const minDate = new Date(filters.minDate)
				const maxDate = new Date(filters.maxDate)
				const dateOrdo = data.dateOrdo ? new Date(data.dateOrdo.split('/').reverse().join('-')) : null

				return (
					dateOrdo &&
					dateOrdo >= minDate &&
					dateOrdo <= maxDate && // ✅ Now filtering based on "Date Ordo"
					(!filters.id || data.refSourceTiers.toLowerCase().includes(filters.id.toLowerCase())) &&
					(!filters.societe || data.societe === filters.societe)
				)
			})
			.map((data) => [
				data.cle || 'Non défini',
				data.dateSaisie ? convertENDateToFr(data.dateSaisie.split('/').reverse().join('-')) : 'Non défini',
				data.dateOrdo ? convertENDateToFr(data.dateOrdo.split('/').reverse().join('-')) : 'Non défini', // ✅ Keeps "Date Ordo" in the table
				data.libelleCompteTiers ?? 'Non défini',
				data.rubriqueTreso ?? 'Non défini',
				data.libelleEcriture ?? 'Non défini',
				keepTwoDecimals(data.credit ? parseFloat(data.credit) : 0),
			])

	const keepTwoDecimals = (number: number): string =>
		new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number)

	const handleDateFilter = (minDate: string, maxDate: string): void => {
		const validMinDate = convertFrDateToServerDate(minDate)
		const validMaxDate = convertFrDateToServerDate(maxDate)

		if (!Date.parse(validMinDate) || !Date.parse(validMaxDate)) {
			console.warn('Invalid date range.', { validMinDate, validMaxDate })
			return
		}
		setFilters({ ...filters, minDate: validMinDate, maxDate: validMaxDate })
	}

	const handleRowClick = (index: number, rowData?: string[]): void => {
		if (rowData) {
			console.log('Row Details:', rowData)
			setConfirmationPopup({ show: true, rowData })
		}
	}

	const handleConfirmValidation = (): void => {
		if (confirmationPopup.rowData) {
			setConfirmedRows((prev) => new Set([...prev, confirmationPopup.rowData[0]]))
			setSuccessMessage('ODV Confirmé !')
			setTimeout(() => setSuccessMessage(null), 3000)
		}
		setConfirmationPopup({ show: false, rowData: null })
	}

	const handleCancelValidation = (): void => {
		setConfirmationPopup({ show: false, rowData: null })
	}

	useEffect(() => {
		setBodyArray(convertToArray(mockedPrevisions))
	}, [filters, confirmedRows])

	const tableData = {
		tableHead: ['Code', 'Date Saisie', 'Date Ordo.', 'Fournisseur', 'Rubrique', 'Libellé', 'Montant'],
		tableBody: bodyArray,
	}

	const societes = Array.from(new Set(mockedPrevisions.map((emission) => emission.societe)))

	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | VALIDATION ODV ${filters.societe}` }} />
			<main id='validationODV'>
				<section className='validationODV__bottomSection'>
					<div className='filtersWrapper'>
						<DateRange
							labelMini='Date Ordo mini'
							labelMaxi='Date Ordo maxi'
							onFilter={handleDateFilter}
							defaultMinDate={filters.minDate}
							defaultMaxDate={filters.maxDate}
						/>
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
					{successMessage && <div className='success-message'>{successMessage}</div>}
					<Nrtl
						datas={tableData}
						headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
						onRowClick={handleRowClick}
					/>
					{confirmationPopup.show && confirmationPopup.rowData && (
						<div className='confirmation-modal'>
							<div className='modal-content'>
								<h3>Confirmer la validation de cet ODV ?</h3>
								<p>
									<strong>Fournisseur:</strong> {confirmationPopup.rowData[3]}
								</p>
								<p>
									<strong>Libellé:</strong> {confirmationPopup.rowData[5]}
								</p>
								<p>
									<strong>Montant:</strong> {confirmationPopup.rowData[6]}
								</p>
								<div className='modal-buttons'>
									<button className='confirm' onClick={handleConfirmValidation}>
										Oui
									</button>
									<button className='cancel' onClick={handleCancelValidation}>
										Non
									</button>
								</div>
							</div>
						</div>
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

export default ValidationODV
