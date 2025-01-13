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

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				const [budgetData, previsionsData, paiementsData] = await Promise.all([
					getBudgetService(userCredentials, refSourceTiers),
					getPrevisionsService(userCredentials, refSourceTiers),
					getPaiementsService(userCredentials, refSourceTiers),
				])

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
				setBudget([])
				setPrevisions([])
				setPaiements([])
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
