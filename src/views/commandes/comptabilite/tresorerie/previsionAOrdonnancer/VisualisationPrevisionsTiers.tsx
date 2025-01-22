import React, { useEffect, useState } from 'react'
import Header from '../../../../../components/header/Header.tsx'
import NRTL from '../../../../../components/NRTL/NRTL.tsx'
import { IUserCredentials } from '../../../../../utils/types/user.interface.ts'
import {
	getBudgetService,
	getPrevisionsService,
	getPaiementsService,
} from '../../../../../API/services/Prevision.service.ts'
import { keepTwoDecimals } from '../../../../../utils/scripts/utils.ts'

// Mocked data for offline mode
const mockedBudget = [
	['Société A', 'Libellé 1', 'Rubrique X', '1000.00', '2024-01-31', 'Validé'],
	['Société B', 'Libellé 2', 'Rubrique Y', '-500.00', '2024-02-15', 'En attente'],
]

const mockedPrevisions = [
	['Société A', 'Libellé 1', 'Rubrique X', '2000.00', '2024-03-31', 'Validé'],
	['Société B', 'Libellé 2', 'Rubrique Y', '-1000.00', '2024-04-15', 'En attente'],
]

const mockedPaiements = [
	['Société A', 'Libellé 1', 'Rubrique X', '1500.00', '2024-01-31', 'Payé'],
	['Société B', 'Libellé 2', 'Rubrique Y', '-750.00', '2024-02-15', 'En attente'],
]

interface VisualisationPrevisionsTiersProps {
	userCredentials: IUserCredentials | null // Allow null
	refSourceTiers: string
	onClose: () => void
}

const VisualisationPrevisionsTiers: React.FC<VisualisationPrevisionsTiersProps> = ({
	userCredentials = null, // Default to null
	refSourceTiers,
	onClose,
}) => {
	const [budget, setBudget] = useState<string[][]>([])
	const [previsions, setPrevisions] = useState<string[][]>([])
	const [paiements, setPaiements] = useState<string[][]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isOffline, setIsOffline] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				// Check if offline
				if (!navigator.onLine) {
					setIsOffline(true)
					throw new Error('Offline mode: Using mocked data.')
				}

				// Check if userCredentials is valid
				if (!userCredentials?.matricule || !userCredentials?.password) {
					console.warn('Invalid credentials: Matricule or password is missing. Using mocked data.')
					setIsOffline(true)
					setBudget(mockedBudget)
					setPrevisions(mockedPrevisions)
					setPaiements(mockedPaiements)
					return // Skip API call
				}

				// Fetch data from API
				const [budgetData, previsionsData, paiementsData] = await Promise.all([
					getBudgetService(userCredentials, refSourceTiers),
					getPrevisionsService(userCredentials, refSourceTiers),
					getPaiementsService(userCredentials, refSourceTiers),
				])

				// Process and set data
				setBudget(
					Array.isArray(budgetData) && budgetData.length > 0
						? budgetData.map((item) => [
								item.societe,
								item.libelleEcriture,
								item.rubriqueTreso,
								Number(item.credit) > 0
									? keepTwoDecimals(Number(item.credit))
									: `-${keepTwoDecimals(Number(item.debit))}`,
								item.dateEcheance,
								item.statut,
							])
						: []
				)

				setPrevisions(
					Array.isArray(previsionsData) && previsionsData.length > 0
						? previsionsData.map((item) => [
								item.societe,
								item.libelleEcriture,
								item.rubriqueTreso,
								Number(item.credit) > 0
									? keepTwoDecimals(Number(item.credit))
									: `-${keepTwoDecimals(Number(item.debit))}`,
								item.dateEcheance,
								item.statut,
							])
						: []
				)

				setPaiements(
					Array.isArray(paiementsData) && paiementsData.length > 0
						? paiementsData.map((item) => [
								item.societe,
								item.libelleEcriture,
								item.rubriqueTreso,
								Number(item.credit) > 0
									? keepTwoDecimals(Number(item.credit))
									: `-${keepTwoDecimals(Number(item.debit))}`,
								item.dateEcheance,
								item.statut,
							])
						: []
				)
			} catch (error) {
				console.error('Erreur lors de la récupération des données :', error)

				// Use mocked data if offline or API fails
				setIsOffline(true)
				setBudget(mockedBudget)
				setPrevisions(mockedPrevisions)
				setPaiements(mockedPaiements)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [userCredentials, refSourceTiers])

	const tableHeaders = ['Société', 'Libellé', 'Rubrique', 'Montant', 'Échéance', 'Statut']

	return (
		<div className='visualisation-previsions-tiers'>
			<div className='header-wrapper'>
				<Header props={{ pageURL: `GIVOO | TRÉSORERIE | VISUALISATION PRÉVISIONS TIERS ${refSourceTiers}` }} />
				<button className='modalCloseButton' onClick={onClose}>
					X
				</button>
			</div>

			<main>
				{isLoading ? (
					<p>Chargement...</p>
				) : (
					<>
						{/* Offline Mode Warning */}
						{isOffline && (
							<div className='offline-warning'>
								<p>Les données affichées sont des données simulées.</p>
							</div>
						)}

						{/* Invalid Credentials Warning */}
						{(!userCredentials?.matricule || !userCredentials?.password) && (
							<div className='credentials-warning'>
								<p>Identifiants invalides. Veuillez vérifier vos informations de connexion.</p>
							</div>
						)}

						{/* Tableau Budget */}
						<h2 className='table-subtitle'>Budget</h2>
						{budget.length === 0 ? (
							<div className='no-data-message'>Aucune donnée trouvée pour le budget.</div>
						) : (
							<div className='custom-nrtl-wrapper'>
								<NRTL
									datas={{
										tableHead: tableHeaders,
										tableBody: budget,
									}}
									headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
									headerHoverBackgroundColor='#1092B8'
									showItemsPerPageSelector={true}
									showPagination={true}
									showPreviousNextButtons={true}
									itemsPerPageOptions={[5, 10, 25]}
									language='fr'
								/>
							</div>
						)}

						{/* Tableau Prévisions */}
						<h2 className='table-subtitle'>Prévisions</h2>
						{previsions.length === 0 ? (
							<div className='no-data-message'>Aucune donnée trouvée pour les prévisions.</div>
						) : (
							<div className='custom-nrtl-wrapper'>
								<NRTL
									datas={{
										tableHead: tableHeaders,
										tableBody: previsions,
									}}
									headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
									headerHoverBackgroundColor='#1092B8'
									showItemsPerPageSelector={true}
									showPagination={true}
									showPreviousNextButtons={true}
									itemsPerPageOptions={[5, 10, 25]}
									language='fr'
								/>
							</div>
						)}

						{/* Tableau Paiements */}
						<h2 className='table-subtitle'>Paiements</h2>
						{paiements.length === 0 ? (
							<div className='no-data-message'>Aucune donnée trouvée pour les paiements.</div>
						) : (
							<div className='custom-nrtl-wrapper'>
								<NRTL
									datas={{
										tableHead: tableHeaders,
										tableBody: paiements,
									}}
									headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
									headerHoverBackgroundColor='#1092B8'
									showItemsPerPageSelector={true}
									showPagination={true}
									showPreviousNextButtons={true}
									itemsPerPageOptions={[5, 10, 25]}
									language='fr'
								/>
							</div>
						)}
					</>
				)}
			</main>
		</div>
	)
}

export default VisualisationPrevisionsTiers
