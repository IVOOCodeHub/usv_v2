import './previsionAOrdonnancer.scss'

import { ReactElement, useContext, useEffect, useState, ChangeEvent, useRef } from 'react'
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom'

// components
// import withAuth from "../../../../../views/auth/withAuth";
import Header from '../../../../../components/header/Header'
import DateRange from '../../../../../components/dateRange/DateRange.tsx'

import NRTL from '../../../../../components/NRTL/NRTL'
// import DisplayCourrierModalWithAuth from "../../../../../components/displayCourrierModal/DisplayCourrierModal.tsx";
import Footer from '../../../../../components/footer/Footer'

// context
import { UserContext } from '../../../../../context/userContext.tsx'
import { LoaderContext } from '../../../../../context/loaderContext.tsx'
import { CourrierContext } from '../../../../../context/courrierContext.tsx'
import { TiersContext } from '../../../../../context/tiersContext.tsx'
import { ITiersPrevisions } from '../../../../../utils/types/tiers.interface.ts'
import { ICourrierDepenses } from '../../../../../utils/types/courrier.interface.ts'
import { ICourrier } from '../../../../../utils/types/courrier.interface.ts'

const PrevisionAOrdonnancer = () => {
	const { userCredentials } = useContext(UserContext)
	const { user } = useContext(UserContext)
	const { getCourrier, courrier } = useContext(CourrierContext)
	const { courrierDepenses, getCourrierDepenses } = useContext(CourrierContext)
	const { getTiersPrevisions, tiersPrevisions } = useContext(TiersContext)
	const { isLoading, startLoading, stopLoading } = useContext(LoaderContext)
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const modalPrevRef = useRef<HTMLDivElement | null>(null)
	const [firstBodyArray, setFirstBodyArray] = useState<string[][]>([])
	const [secondBodyArray, setSecondBodyArray] = useState<string[][]>([])
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [selectedPrevision, setSelectedPrevision] = useState<ITiersPrevisions | null>(null)
	const [filters, setFilters] = useState({
		minDate: '',
		maxDate: '',
		libelle: '',
		minAmount: '',
		maxAmount: '',
	})

	const navigate: NavigateFunction = useNavigate()
	// const location = useLocation()
	// const { rowData } = location.state
	// const relanceInitialData = {
	// 	courrierID: rowData[0],
	// 	dateReception: rowData[1],
	// 	tiers: rowData[2],
	// 	societe: rowData[3],
	// 	nature: rowData[4],
	// 	action: rowData[5],
	// 	commentaire: rowData[6],
	// }

	const convertToArray: (datas: ICourrierDepenses[]) => string[][] = (datas: ICourrierDepenses[]): string[][] => {
		return datas.map((data: ICourrierDepenses): string[] => [
			data.index,
			data.dhSaisie,
			data.societeEmettrice,
			data.societe,
			data.nature,
			data.action,
			data.commentaire,
		])
	}

	useEffect((): void => {
		startLoading()
		if (userCredentials) {
			getCourrierDepenses(userCredentials).finally(stopLoading)
		}
	}, [])

	useEffect((): void => {
		if (Array.isArray(courrierDepenses)) {
			setBodyArray(convertToArray(courrierDepenses))
		}
	}, [getCourrierDepenses, courrierDepenses])

	const tableData = {
		tableHead: ['Clé courrier', 'Date réception', 'Émetteur', 'Destinataire', 'Nature', 'Action', 'Commentaire'],
		tableBody: bodyArray,
	}

	// const firstTableData = {
	// 	tableHead: ['Courrier', 'Émetteur', 'Destinataire', 'Nature', 'Service', 'Commentaire'],
	// 	tableBody: firstBodyArray,
	// }

	// const convertToArrayForFirstTable = (courriers: ICourrier[]): string[][] => {
	// 	return courriers.map((courrier: ICourrier): string[] => [
	// 		courrier.cle,
	// 		courrier.societeEmettrice,
	// 		courrier.societe,
	// 		courrier.nature,
	// 		courrier.service,
	// 		courrier.commentaire,
	// 	])
	// }

	// const secondTableData = {
	// 	tableHead: ['Clé prévision', 'Date échéance', 'Libellé', 'Montant', 'Statut', 'Réf. paiement'],
	// 	tableBody: secondBodyArray,
	// }

	const keepTwoDecimals = (number: number): string => {
		return new Intl.NumberFormat('fr-FR', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number)
	}

	// const convertToArrayForSecondTable = (previsions: ITiersPrevisions[]): string[][] => {
	// 	return previsions.map((previsions: ITiersPrevisions): string[] => [
	// 		previsions.cle,
	// 		previsions.dateEcheance,
	// 		previsions.libelleEcriture,
	// 		keepTwoDecimals(parseFloat(previsions.credit)) + ' €',
	// 		previsions.statut,
	// 		previsions.referencePaiement === '0' ? 'Aucune' : previsions.referencePaiement,
	// 	])
	// }

	// const handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
	// 	const { name, value } = event.target
	// 	setFilters(
	// 		(prevFilters: {
	// 			minDate: string
	// 			maxDate: string
	// 			libelle: string
	// 			minAmount: string
	// 			maxAmount: string
	// 		}): {
	// 			minDate: string
	// 			maxDate: string
	// 			libelle: string
	// 			minAmount: string
	// 			maxAmount: string
	// 		} => ({
	// 			...prevFilters,
	// 			[name]: value,
	// 		})
	// 	)
	// }

	// const handleSecondTableRowClick = (rowData: string[], rowIndex: number): void => {
	// 	if (typeof tiersPrevisions === 'object') {
	// 		const selected: ITiersPrevisions = tiersPrevisions![rowIndex]
	// 		setSelectedPrevision(selected)
	// 		setIsDetailsModalOpen(true)
	// 	}
	// }
	return (
		<>
			<Header
				props={{
					pageURL: 'GIVOO | TRÉSORERIE | PRÉVISION À ORDONNANCER',
				}}
			/>
			<main id={'previsionAOrdonnancer'}>
				<div className={'dateRangeContainer'}>
					<DateRange />
				</div>
				<section className={'previsionAOrdonnancer__bottomSection'}>
					<form>
						<div className={'inputWrapper'}>
							<label htmlFor={'minDate'}>Date mini : </label>
							<input
								// onChange={handleFilterChange}
								name={'minDate'}
								type={'date'}
							/>
						</div>
						<div className={'inputWrapper'}>
							<label htmlFor={'maxDate'}>Date maxi : </label>
							<input
								// onChange={handleFilterChange}
								name={'maxDate'}
								type={'date'}
							/>
						</div>
						<div className={'inputWrapper'}>
							<label htmlFor={'libelle'}>Libellé : </label>
							<input
								// onChange={handleFilterChange}
								name={'libelle'}
								type={'text'}
							/>
						</div>
						<div className={'inputWrapper'}>
							<label htmlFor={'minAmount'}>Montant mini : </label>
							<input
								// onChange={handleFilterChange}
								name={'minAmount'}
								type={'number'}
							/>
						</div>
						<div className={'inputWrapper'}>
							<label htmlFor={'maxAmount'}>Montant maxi : </label>
							<input
								// onChange={handleFilterChange}
								name={'maxAmount'}
								type={'number'}
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
						showSearchBar={true}
						showPagination={true}
						itemsPerPageOptions={[5, 25, 50]}
						filterableColumns={[false, false, false, false, true, false]}
						language={'fr'}
						// onRowClick={(rowData: string[], index: number): void => handleSecondTableRowClick(rowData, index)}
					/>
				</section>
			</main>
			<Footer />
		</>
	)
}
export default PrevisionAOrdonnancer
