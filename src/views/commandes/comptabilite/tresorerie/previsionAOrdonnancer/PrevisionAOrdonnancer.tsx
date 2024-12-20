// styles
import './previsionAOrdonnancer.scss'

// utils
import { convertFrDateToServerDate, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'

// hooks | libraries
import { ReactElement, useContext, useEffect, useState, ChangeEvent } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'

// custom types
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'

// components
// import withAuth from "../../../../../views/auth/withAuth";
import Header from '../../../../../components/header/Header'
// import DateRange from '../../../../../components/dateRange/DateRange.tsx'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'

// context
import { UserContext } from '../../../../../context/userContext.tsx'
import { LoaderContext } from '../../../../../context/loaderContext.tsx'
import { PrevisionContext } from '../../../../../context/previsionContext/PrevisionContext.tsx'

const PrevisionAOrdonnancer: () => ReactElement = (): ReactElement => {
	const { userCredentials } = useContext(UserContext)
	const { startLoading, stopLoading } = useContext(LoaderContext)
	const { previsionsOrdonnance, getPrevisionOrdonnance } = useContext(PrevisionContext)

	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [filters, setFilters] = useState({
		minDate: '',
		maxDate: '',
		cle: '',
	})
	const [dateMin, setDateMin] = useState<string>(convertFrDateToServerDate('01/01/2022'))
	const [dateMax, setDateMax] = useState<string>(convertFrDateToServerDate('31/12/2022'))

	const navigate: NavigateFunction = useNavigate()

	const convertToArray: (datas: IPrevision[]) => string[][] = (datas: IPrevision[]): string[][] => {
		return datas.map((data: IPrevision): string[] => [
			data.cle,
			convertENDateToFr(data.dateEcheance.split('/').reverse().join('-')), // Convertit DD/MM/YYYY -> YYYY-MM-DD, puis affiche DD/MM/YYYY
			convertENDateToFr(data.dateOrdo.split('/').reverse().join('-')), // Même logique pour la colonne Ordo
			data.libelleCompteTiers,
			data.libelleEcriture,
			data.societe,
			keepTwoDecimals(Number(data.credit)),
		])
	}

	// const dateMin: string = convertFrDateToServerDate('01/01/2022')
	// const dateMax: string = convertFrDateToServerDate('31/12/2022')

	useEffect((): void => {
		startLoading()
		if (userCredentials) {
			getPrevisionOrdonnance(userCredentials, dateMin, dateMax).finally(stopLoading)
		}
	}, [])

	useEffect((): void => {
		if (Array.isArray(previsionsOrdonnance)) {
			setBodyArray(convertToArray(previsionsOrdonnance))
		}
	}, [getPrevisionOrdonnance, previsionsOrdonnance])

	const keepTwoDecimals = (number: number): string => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number)
	}

	const applyFilters: () => string[][] = (): string[][] => {
		return bodyArray.filter((row: string[]): boolean => {
			// Reconversion de la date en format ISO avant la comparaison
			const dateEcheance = new Date(convertFrDateToServerDate(row[1]))

			// Convertit les filtres en objets Date si définis
			const minDate: Date | null = filters.minDate ? new Date(filters.minDate) : null
			const maxDate: Date | null = filters.maxDate ? new Date(filters.maxDate) : null

			// console.log('Date échéance:', dateEcheance)
			// console.log('Min Date:', minDate)
			// console.log('Max Date:', maxDate)

			// Effectue les comparaisons
			return (!minDate || dateEcheance >= minDate) && (!maxDate || dateEcheance <= maxDate)
		})
	}

	const handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void = (
		event: ChangeEvent<HTMLInputElement>
	): void => {
		const { name, value } = event.target
		setFilters(
			(prevFilters: {
				minDate: string
				maxDate: string
				cle: string
			}): { minDate: string; maxDate: string; cle: string } => ({
				...prevFilters,
				[name]: value,
			})
		)
	}

	const handleRowClick = (index: number, rowData?: string[]): void => {
		if (rowData) {
			console.log('Données de la ligne cliquée :', rowData)
			navigate('/commandes/tresorerie/details_prevision_ordo', { state: { rowData } })
		} else {
			console.warn('Aucune donnée disponible pour cette ligne.')
		}
	}

	const tableData = {
		tableHead: ['Code', 'Échéance', 'Ordo', 'Fournisseur', 'Libellé', 'Destinataire', 'Montant'],
		tableBody: applyFilters(),
	}

	return (
		<>
			<Header
				props={{
					pageURL: 'GIVOO | TRÉSORERIE | PRÉVISION À ORDONNANCER',
				}}
			/>
			<main id={'previsionAOrdonnancer'}>
				<section className={'previsionAOrdonnancer__bottomSection'}>
					<form>
						<div className={'inputWrapper'}>
							<label htmlFor={'minDate'}>Date mini : </label>
							<input name={'minDate'} type={'date'} value={filters.minDate} onChange={handleFilterChange} />
						</div>
						<div className={'inputWrapper'}>
							<label htmlFor={'maxDate'}>Date maxi : </label>
							<input name={'maxDate'} type={'date'} value={filters.maxDate} onChange={handleFilterChange} />
						</div>
						<div className={'inputWrapper'}>
							<label htmlFor={'cle'}>Code : </label>
							<input
								name={'cle'}
								type={'text'}
								placeholder='Filtrer par code'
								value={filters.cle}
								onChange={handleFilterChange}
							/>
						</div>
					</form>
					<NRTL
						datas={tableData}
						headerBackgroundColor={'linear-gradient(to left, #84CDE4FF, #1092B8)'}
						headerHoverBackgroundColor={'#1092B8'}
						showPreviousNextButtons={true}
						enableColumnSorting={true}
						showItemsPerPageSelector={true}
						showPagination={true}
						itemsPerPageOptions={[5, 25, 50]}
						filterableColumns={[false, false, false, true, false, true, false]}
						language={'fr'}
						onRowClick={(index: number, rowData?: string[]) => handleRowClick(index, rowData)}
					/>
					<div className='greyButtonWrapper'>
						<Button
							props={{
								style: 'grey',
								text: 'Retour',
								type: 'button',
								onClick: (): void => navigate(-1),
							}}
						/>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default PrevisionAOrdonnancer
