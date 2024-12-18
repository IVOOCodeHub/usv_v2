import './previsionAOrdonnancer.scss'

import { ReactElement, useContext, useEffect, useState, ChangeEvent, useRef } from 'react'
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom'

// components
// import withAuth from "../../../../../views/auth/withAuth";
import Header from '../../../../../components/header/Header'
// import DateRange from '../../../../../components/dateRange/DateRange.tsx'

import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
// import DisplayCourrierModalWithAuth from "../../../../../components/displayCourrierModal/DisplayCourrierModal.tsx";
import Footer from '../../../../../components/footer/Footer'

// context
import { UserContext } from '../../../../../context/userContext.tsx'
import { LoaderContext } from '../../../../../context/loaderContext.tsx'
import { CourrierContext } from '../../../../../context/courrierContext.tsx'
import { TiersContext } from '../../../../../context/tiersContext.tsx'
import { ITiersPrevisions } from '../../../../../utils/types/tiers.interface.ts'
import { ICourrierDepenses } from '../../../../../utils/types/courrier.interface.ts'
// import { ICourrier } from '../../../../../utils/types/courrier.interface.ts'

const PrevisionAOrdonnancer = () => {
	// Contexts
	const { userCredentials } = useContext(UserContext)
	const { getTiersPrevisions, tiersPrevisions } = useContext(TiersContext)
	const { startLoading, stopLoading } = useContext(LoaderContext)

	// États
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [filters, setFilters] = useState({
		minDate: '',
		maxDate: '',
		cle: '',
	})

	const navigate: NavigateFunction = useNavigate()

	// Convertit les données reçues en tableau compatible
	const convertToArray = (datas: ITiersPrevisions[]): string[][] => {
		return datas.map((data: ITiersPrevisions): string[] => [
			data.cleCourrier, // Colonne 'Code'
			data.dateEcheance, // Colonne 'Échéance'
			data.dateOrdo, // Colonne 'Ordo'
			data.libelleCompteTiers, // Colonne 'Fournisseur'
			data.libelleEcriture, // Colonne 'Libellé'
			data.societe, // Colonne 'Destinataire'
			keepTwoDecimals(Number(data.debit)), // Colonne 'Montant'
		])
	}

	// Charge les données à l'initialisation
	useEffect((): void => {
		startLoading()
		if (userCredentials) {
			getTiersPrevisions(userCredentials).finally(stopLoading)
		}
	}, [])

	// Met à jour le tableau lorsque les données changent
	useEffect((): void => {
		if (Array.isArray(tiersPrevisions)) {
			setBodyArray(convertToArray(tiersPrevisions))
		}
	}, [tiersPrevisions])

	// Formate les nombres pour avoir 2 décimales
	const keepTwoDecimals = (number: number): string => {
		return new Intl.NumberFormat('fr-FR', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number)
	}

	// Filtrage des données
	const applyFilters = (): string[][] => {
		return bodyArray.filter((row) => {
			const dateReception = new Date(row[1]) // Colonne 'Échéance'
			const minDate = filters.minDate ? new Date(filters.minDate) : null
			const maxDate = filters.maxDate ? new Date(filters.maxDate) : null
			const filterCle = filters.cle ? filters.cle : ''

			return (
				(!minDate || dateReception >= minDate) &&
				(!maxDate || dateReception <= maxDate) &&
				(!filterCle || row[0].includes(filterCle)) // Filtre sur la colonne 'Code'
			)
		})
	}

	// Gestion des changements dans les filtres
	const handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = event.target
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}))
	}

	// Configuration des données du tableau
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
							<label htmlFor={'cle'}>Clé courrier : </label>
							<input
								name={'cle'}
								type={'text'}
								placeholder='Filtrer par clé'
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
						language={'fr'}
					/>
					<Button
										props={{
											style: 'grey',
											text: 'Retour',
											type: 'button',
											onClick: (): void => navigate('/commandes/tresorerie/menu'),
										}}
									/>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default PrevisionAOrdonnancer
