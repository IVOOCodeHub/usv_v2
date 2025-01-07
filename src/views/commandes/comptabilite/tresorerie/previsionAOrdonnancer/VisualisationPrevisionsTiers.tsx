import React, { useEffect, useState } from 'react'
import Header from '../../../../../components/header/Header.tsx'
import NRTL from '../../../../../components/NRTL/NRTL.tsx'
import { IUserCredentials } from '../../../../../utils/types/user.interface.ts'
import {
	getBudgetService,
	getPrevisionsService,
	getPaiementsService,
} from '../../../../../API/services/Prevision.service.ts'

interface VisualisationPrevisionsTiersProps {
	userCredentials: IUserCredentials
	refSourceTiers: string
	onClose: () => void // Pour un bouton "Fermer"
}

const VisualisationPrevisionsTiers: React.FC<VisualisationPrevisionsTiersProps> = ({
	userCredentials,
	refSourceTiers,
	onClose,
}) => {
	const [budget, setBudget] = useState<string[][]>([])
	const [previsions, setPrevisions] = useState<string[][]>([])
	const [paiements, setPaiements] = useState<string[][]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	console.log('Paramètres pour getBudgetService :', userCredentials, refSourceTiers)
	console.log('Paramètres pour getPrevisionsService :', userCredentials, refSourceTiers)
	console.log('Paramètres pour getPaiementsService :', userCredentials, refSourceTiers)

	// Mock de données
	const mockBudget = [
		['Société A', 'Libellé 1', 'Rubrique 1', '1000.00', '2025-01-10', 'Validé'],
		['Société B', 'Libellé 2', 'Rubrique 2', '2000.00', '2025-02-15', 'En attente'],
		['Société C', 'Libellé 3', 'Rubrique 3', '1500.00', '2025-03-20', 'Refusé'],
	]

	const mockPrevisions = [
		['Société A', 'Libellé 4', 'Rubrique 1', '3000.00', '2025-04-05', 'Validé'],
		['Société B', 'Libellé 5', 'Rubrique 2', '2500.00', '2025-05-10', 'En attente'],
		['Société C', 'Libellé 6', 'Rubrique 3', '1800.00', '2025-06-15', 'Refusé'],
		['Société A', 'Libellé 7', 'Rubrique 1', '4000.00', '2025-07-20', 'Validé'],
		['Société B', 'Libellé 8', 'Rubrique 2', '3200.00', '2025-08-25', 'En attente'],
	]

	const mockPaiements = Array.from({ length: 22 }, (_, index) => [
		`Société ${index + 1}`,
		`Libellé ${index + 9}`,
		`Rubrique ${(index % 3) + 1}`,
		`${(index + 1) * 1000}.00`,
		`2025-09-${String(index + 1).padStart(2, '0')}`,
		index % 2 === 0 ? 'Validé' : 'En attente',
	])

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				const [budgetData, previsionsData, paiementsData] = await Promise.all([
					getBudgetService(userCredentials, refSourceTiers),
					getPrevisionsService(userCredentials, refSourceTiers),
					getPaiementsService(userCredentials, refSourceTiers),
				])

				console.log('budget : ', budgetData)
				console.log('previsions : ', previsionsData)
				console.log('paiements : ', paiementsData)

				// Transformer les données en tableaux pour NRTL
				setBudget(
					budgetData.map((item) => [
						item.societe,
						item.libelle,
						item.rubrique,
						item.montant,
						item.echeance,
						item.statut,
					])
				)
				setPrevisions(
					previsionsData.map((item) => [
						item.societe,
						item.libelle,
						item.rubrique,
						item.montant,
						item.echeance,
						item.statut,
					])
				)
				setPaiements(
					paiementsData.map((item) => [
						item.societe,
						item.libelle,
						item.rubrique,
						item.montant,
						item.echeance,
						item.statut,
					])
				)
			} catch (error) {
				console.error('Erreur lors de la récupération des données :', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [userCredentials, refSourceTiers])

	// simulation de données
	useEffect(() => {
		setIsLoading(true)

		// Simulation de chargement des données mockées
		setTimeout(() => {
			setBudget(mockBudget)
			setPrevisions(mockPrevisions)
			setPaiements(mockPaiements)
			setIsLoading(false)
		}, 1000) // Simule un délai de chargement d'une seconde
	}, [])

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
						{/* Tableau Budget */}
						<h2 className='table-subtitle'>Budget</h2>
						<div className='nrtl-container'>
							<NRTL
								datas={{ tableHead: tableHeaders, tableBody: budget }}
								headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
								headerHoverBackgroundColor='#1092B8'
								showItemsPerPageSelector={true}
								showPagination={true}
								showPreviousNextButtons={true}
								itemsPerPageOptions={[5, 10, 25]}
								language='fr'
							/>
						</div>

						{/* Tableau Prévisions */}
						<h2 className='table-subtitle'>Prévisions</h2>
						<div className='nrtl-container'>
							<NRTL
								datas={{ tableHead: tableHeaders, tableBody: previsions }}
								headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
								headerHoverBackgroundColor='#1092B8'
								showItemsPerPageSelector={true}
								showPagination={true}
								showPreviousNextButtons={true}
								itemsPerPageOptions={[5, 10, 25]}
								language='fr'
							/>
						</div>

						{/* Tableau Paiements */}
						<h2 className='table-subtitle'>Paiements</h2>
						<div className='nrtl-container'>
							<NRTL
								datas={{ tableHead: tableHeaders, tableBody: paiements }}
								headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
								headerHoverBackgroundColor='#1092B8'
								showItemsPerPageSelector={true}
								showPagination={true}
								showPreviousNextButtons={true}
								itemsPerPageOptions={[5, 10, 25]}
								language='fr'
							/>
						</div>
					</>
				)}
			</main>
		</div>
	)
}

export default VisualisationPrevisionsTiers
