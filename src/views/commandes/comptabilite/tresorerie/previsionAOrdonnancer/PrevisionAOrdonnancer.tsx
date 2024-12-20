import './previsionAOrdonnancer.scss'
import { convertFrDateToServerDate, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import { UserContext } from '../../../../../context/userContext.tsx'
import { LoaderContext } from '../../../../../context/loaderContext.tsx'
import { PrevisionContext } from '../../../../../context/previsionContext/PrevisionContext.tsx'

const PrevisionAOrdonnancer: () => ReactElement = (): ReactElement => {
	// Contexts pour les données utilisateur, chargement, et prévisions
	const { userCredentials } = useContext(UserContext)
	const { startLoading, stopLoading } = useContext(LoaderContext)
	const { previsionsOrdonnance, getPrevisionOrdonnance } = useContext(PrevisionContext)

	// États pour les données du tableau et les filtres
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [filters, setFilters] = useState({
		minDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0], // 1er janvier
		maxDate: new Date().toISOString().split('T')[0], // Aujourd'hui
		cle: '', // Filtre par "Code"
	})

	// Navigation pour rediriger vers les détails
	const navigate = useNavigate()

	// Vérifie si une plage de dates est valide
	const isDateRangeValid = (min: string, max: string): boolean => {
		const dateMin = new Date(min)
		const dateMax = new Date(max)
		return dateMin <= dateMax
	}

	// Fonction pour lancer la requête API avec les dates
	// const handleFilterClick = (): void => {
	// 	// const validMinDate = convertFrDateToServerDate(filters.minDate)
	// 	// const validMaxDate = convertFrDateToServerDate(filters.maxDate)
	// 	const validMinDate: string = convertFrDateToServerDate('01/01/2022')
	// 	const validMaxDate: string = convertFrDateToServerDate('31/12/2024')

	// 	if (!isDateRangeValid(validMinDate, validMaxDate)) {
	// 		console.warn('Plage de dates incohérente :', { minDate: validMinDate, maxDate: validMaxDate })
	// 		return
	// 	}

	// 	if (userCredentials) {
	// 		console.log('Envoi de la requête API avec :', { minDate: validMinDate, maxDate: validMaxDate })
	// 		startLoading()
	// 		getPrevisionOrdonnance(userCredentials, validMinDate, validMaxDate).finally(stopLoading)
	// 	}
	// }

	const dateMin: string = convertFrDateToServerDate('01/01/2022')
	const dateMax: string = convertFrDateToServerDate('31/12/2024')
	useEffect((): void => {
		startLoading()
		if (userCredentials) {
			getPrevisionOrdonnance(userCredentials, dateMin, dateMax).finally(stopLoading)
		}
	}, [])

	// Convertir les données reçues pour le tableau
	const convertToArray = (datas: IPrevision[]): string[][] =>
		datas
			.filter((data) => !filters.cle || data.cle.includes(filters.cle)) // Filtrer par "Code"
			.map((data) => [
				data.cle,
				convertENDateToFr(data.dateEcheance.split('/').reverse().join('-')),
				convertENDateToFr(data.dateOrdo.split('/').reverse().join('-')),
				data.libelleCompteTiers,
				data.libelleEcriture,
				data.societe,
				keepTwoDecimals(Number(data.credit)),
			])

	// Met à jour les données du tableau après récupération des prévisions
	useEffect((): void => {
		if (Array.isArray(previsionsOrdonnance)) {
			console.log('Données reçues :', previsionsOrdonnance)
			setBodyArray(convertToArray(previsionsOrdonnance))
		}
	}, [previsionsOrdonnance, filters.cle])

	// Formater les montants en euros
	const keepTwoDecimals = (number: number): string =>
		new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number)

	// Naviguer vers les détails d'une ligne
	const handleRowClick = (index: number, rowData?: string[]): void => {
		if (rowData) {
			navigate('/commandes/tresorerie/details_prevision_ordo', { state: { rowData } })
		} else {
			console.warn('Aucune donnée disponible pour cette ligne.')
		}
	}

	// Préparer les données pour le tableau
	const tableData = {
		tableHead: ['Code', 'Échéance', 'Ordo', 'Fournisseur', 'Libellé', 'Destinataire', 'Montant'],
		tableBody: bodyArray,
	}

	// Rendu du composant
	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | PRÉVISION À ORDONNANCER' }} />
			<main id='previsionAOrdonnancer'>
				<section className='previsionAOrdonnancer__bottomSection'>
					<form>
						<div className='inputWrapper'>
							<label htmlFor='minDate'>Date mini :</label>
							<input
								name='minDate'
								type='date'
								value={filters.minDate}
								onChange={(e) => setFilters({ ...filters, minDate: e.target.value })}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='maxDate'>Date maxi :</label>
							<input
								name='maxDate'
								type='date'
								value={filters.maxDate}
								onChange={(e) => setFilters({ ...filters, maxDate: e.target.value })}
							/>
						</div>
						<div className='buttonWrapper'>
							<Button
								props={{
									style: 'blue',
									text: 'Filtrer',
									type: 'button',
									// onClick: handleFilterClick,
								}}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='cle'>Code :</label>
							<input
								name='cle'
								type='text'
								placeholder='Filtrer par code'
								value={filters.cle}
								onChange={(e) => setFilters({ ...filters, cle: e.target.value })}
							/>
						</div>
					</form>
					<NRTL
						datas={tableData}
						headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
						headerHoverBackgroundColor='#1092B8'
						showPreviousNextButtons
						enableColumnSorting
						showItemsPerPageSelector
						showPagination
						itemsPerPageOptions={[5, 25, 50]}
						filterableColumns={[false, false, false, true, false, true, false]}
						language='fr'
						onRowClick={(index: number, rowData?: string[]) => handleRowClick(index, rowData)}
					/>
					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default PrevisionAOrdonnancer
