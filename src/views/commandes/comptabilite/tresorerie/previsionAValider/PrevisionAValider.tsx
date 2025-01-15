import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import { mockedPrevisions } from './mock/mockPrevValider.ts'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import './previsionAValider.scss'
import '../previsionAOrdonnancer/previsionAOrdonnancer.scss'

interface RowDetails {
	societe: string
	cle: string
	dateSaisie: string
	dateEcheance: string
	fournisseur: string
	libelleEcriture: string
	montant: string
	rubriqueTreso: string
	nomFichier: string
}

const PrevisionAValider: React.FC = () => {
	const navigate = useNavigate()

	// State for table data and filters
	const [bodyArray, setBodyArray] = useState<{ rubrique: string; rows: (string | undefined)[][] }[]>([])
	const [codeFilter, setCodeFilter] = useState('') // Only "Code" filter

	// Convert data for the table
	const convertToArrayWithGrouping = (datas: IPrevision[]): { rubrique: string; rows: (string | undefined)[][] }[] => {
		const groupedData = datas.reduce(
			(acc, data) => {
				const rubrique = data.rubriqueTreso ?? 'Non défini'
				if (!acc[rubrique]) {
					acc[rubrique] = []
				}
				acc[rubrique].push([
					data.societe ?? 'Non défini',
					data.cle || 'Non défini',
					data.dateSaisie ?? 'Non défini',
					data.dateEcheance ?? 'Non défini',
					data.libelleCompteTiers ?? 'Non défini',
					data.libelleEcriture ?? 'Non défini',
					data.credit ? parseFloat(data.credit).toFixed(2) : '0.00',
					data.nomFichier ?? 'Aucun Fichier', // Ensure this is the last element
				])
				return acc
			},
			{} as Record<string, (string | undefined)[][]>
		)

		return Object.entries(groupedData).map(([rubrique, rows]) => ({
			rubrique,
			rows,
		}))
	}

	// Function to get row details
	const getRowDetails = (cle: string): RowDetails | undefined => {
		const matchedPrevision = mockedPrevisions.find((prevision) => prevision.cle === cle)
		if (!matchedPrevision) return undefined

		return {
			societe: matchedPrevision.societe ?? 'Non défini',
			cle: matchedPrevision.cle || 'Non défini',
			dateSaisie: matchedPrevision.dateSaisie ?? 'Non défini',
			dateEcheance: matchedPrevision.dateEcheance ?? 'Non défini',
			fournisseur: matchedPrevision.libelleCompteTiers ?? 'Non défini',
			libelleEcriture: matchedPrevision.libelleEcriture ?? 'Non défini',
			montant: matchedPrevision.credit ? parseFloat(matchedPrevision.credit).toFixed(2) : '0.00',
			rubriqueTreso: matchedPrevision.rubriqueTreso ?? 'Non défini',
			nomFichier: matchedPrevision.nomFichier ?? 'Aucun fichier',
		}
	}

	// Update table data with mocked data
	useEffect(() => {
		const filteredData = mockedPrevisions.filter((prevision) =>
			prevision.cle.toLowerCase().includes(codeFilter.toLowerCase())
		)
		setBodyArray(convertToArrayWithGrouping(filteredData))
	}, [codeFilter])

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | PRÉVISIONS À VALIDER' }} />
			<main id='previsionAValider'>
				<section className='previsionAValider__bottomSection'>
					<div className='filtersWrapper'>
						<DateRange onFilter={() => {}} defaultMinDate={''} defaultMaxDate={''} />
						<div className='codeInputWrapper'>
							<label htmlFor='cle'>Code :</label>
							<input
								name='cle'
								type='text'
								placeholder='Filtrer par code'
								value={codeFilter}
								onChange={(e) => setCodeFilter(e.target.value)}
							/>
						</div>
					</div>
					<div id='groupedTable'>
						{bodyArray.length === 0 ? (
							<div className='no-results'>Aucune prévision trouvée pour le code "{codeFilter}".</div>
						) : (
							bodyArray.map((group, groupIndex) => (
								<div key={groupIndex} className='rubriqueGroup'>
									<div className='rubriqueTitle'>{group.rubrique}</div>
									<NRTL
										datas={{
											tableHead: [
												'Société',
												'Code',
												'Date Saisie',
												'Date Échéance',
												'Fournisseur',
												'Libellé écriture',
												'Montant',
												'Courrier',
											],
											tableBody: group.rows,
										}}
										headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
										headerHoverBackgroundColor='#1092B8'
										showPreviousNextButtons
										enableColumnSorting
										showItemsPerPageSelector
										showPagination
										itemsPerPageOptions={[5, 25, 50]}
										filterableColumns={[true, false, false, false, false, false, false]}
										language='fr'
										onRowClick={(index: number, rowData?: (string | undefined)[]) => {
											if (rowData && rowData[1]) {
												const cle = rowData[1]
												const rowDetails = getRowDetails(cle)
												if (rowDetails) {
													navigate(`/commandes/tresorerie/details_prevision_valider/`, {
														state: { fullRowDetails: rowDetails },
													})
												} else {
													console.error('Aucune prévision correspondante trouvée pour la clé:', cle)
												}
											}
										}}
									/>
								</div>
							))
						)}
					</div>
					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default PrevisionAValider
