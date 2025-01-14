import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import './previsionAValider.scss'

const PrevisionAValider: () => ReactElement = (): ReactElement => {
	const navigate = useNavigate()

	// Mocked data (replace with API call later)
	const mockedPrevisions: IPrevision[] = [
		{
			cle: 'PREV001',
			societe: 'Société X',
			dateSaisie: '2024-01-01',
			dateEcheance: '2024-01-15',
			libelleCompteTiers: 'DESLANDES',
			libelleEcriture: 'HYGIENE 11 4124 SOLDE CDE N° 557',
			credit: '1000.0',
			codeJournal: 'PREV',
			datePiece: '2024-01-01',
			rubriqueTreso: 'BANQUE', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV002',
			societe: 'Société Y',
			dateSaisie: '2024-02-01',
			dateEcheance: '2024-02-20',
			libelleCompteTiers: 'IONOS',
			libelleEcriture: 'INFORMATIQUE 06 2T23 SOLDE CDE N° 273',
			credit: '500.0',
			codeJournal: 'PREV',
			datePiece: '2024-02-01',
			rubriqueTreso: 'NOTE DE FRAIS', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV003',
			societe: 'Société Z',
			dateSaisie: '2024-03-01',
			dateEcheance: '2024-03-15',
			libelleCompteTiers: 'SODEXO',
			libelleEcriture: 'TR 11 4T24 SOLDE CDE N° 556',
			credit: '1500.0',
			codeJournal: 'PREV',
			datePiece: '2024-03-01',
			rubriqueTreso: 'FOURNISSEURS', // Randomly assigned
			nomFichier: undefined, // Randomly assigned or left empty
		},
		{
			cle: 'PREV004',
			societe: 'Société A',
			dateSaisie: '2024-04-01',
			dateEcheance: '2024-04-15',
			libelleCompteTiers: 'GANDI SAS',
			libelleEcriture: 'INFORMATIQUE 08 3T23 SOLDE CDE N° 300',
			credit: '750.0',
			codeJournal: 'PREV',
			datePiece: '2024-04-01',
			rubriqueTreso: 'TELECOM', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV005',
			societe: 'Société B',
			dateSaisie: '2024-05-01',
			dateEcheance: '2024-05-15',
			libelleCompteTiers: 'OCTOPUSH',
			libelleEcriture: 'INFORMATIQUE 09 3T23 SOLDE CDE N° 318',
			credit: '1200.0',
			codeJournal: 'PREV',
			datePiece: '2024-05-01',
			rubriqueTreso: 'LOVERS', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV006',
			societe: 'Société C',
			dateSaisie: '2024-06-01',
			dateEcheance: '2024-06-15',
			libelleCompteTiers: 'ALIEXPRESS',
			libelleEcriture: 'INFORMATIQUE 10 4T24 SOLDE CDE N° 534',
			credit: '900.0',
			codeJournal: 'PREV',
			datePiece: '2024-06-01',
			rubriqueTreso: 'HONORAIRES', // Randomly assigned
			nomFichier: undefined, // Randomly assigned or left empty
		},
		{
			cle: 'PREV007',
			societe: 'Société D',
			dateSaisie: '2024-07-01',
			dateEcheance: '2024-07-15',
			libelleCompteTiers: 'AMAZON',
			libelleEcriture: 'DOCUMENTATION 11 4T24 SOLDE CDE N° 546',
			credit: '2000.0',
			codeJournal: 'PREV',
			datePiece: '2024-07-01',
			rubriqueTreso: 'ELECTRICITE-EAU', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV008',
			societe: 'Société E',
			dateSaisie: '2024-08-01',
			dateEcheance: '2024-08-15',
			libelleCompteTiers: 'AMAZON',
			libelleEcriture: 'DOCUMENTATION 11 4T24 SOLDE CDE N° 546',
			credit: '2000.0',
			codeJournal: 'PREV',
			datePiece: '2024-08-01',
			rubriqueTreso: 'CHARGES SALARIALES', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV009',
			societe: 'Société F',
			dateSaisie: '2024-09-01',
			dateEcheance: '2024-09-15',
			libelleCompteTiers: 'DESLANDES',
			libelleEcriture: 'HYGIENE 11 4124 SOLDE CDE N° 557',
			credit: '1000.0',
			codeJournal: 'PREV',
			datePiece: '2024-09-01',
			rubriqueTreso: 'IMPOTS ET TAXES', // Randomly assigned
			nomFichier: undefined, // Randomly assigned or left empty
		},
		{
			cle: 'PREV010',
			societe: 'Société G',
			dateSaisie: '2024-10-01',
			dateEcheance: '2024-10-15',
			libelleCompteTiers: 'IONOS',
			libelleEcriture: 'INFORMATIQUE 06 2T23 SOLDE CDE N° 273',
			credit: '500.0',
			codeJournal: 'PREV',
			datePiece: '2024-10-01',
			rubriqueTreso: 'ETALEMENT', // Randomly assigned
			nomFichier: undefined, // Randomly assigned or left empty
		},
		{
			cle: 'PREV011',
			societe: 'Société H',
			dateSaisie: '2024-11-01',
			dateEcheance: '2024-11-15',
			libelleCompteTiers: 'SODEXO',
			libelleEcriture: 'TR 11 4T24 SOLDE CDE N° 556',
			credit: '1500.0',
			codeJournal: 'PREV',
			datePiece: '2024-11-01',
			rubriqueTreso: 'FOURNISSEURS', // Randomly assigned
			nomFichier: undefined, // Randomly assigned or left empty
		},
		{
			cle: 'PREV012',
			societe: 'Société I',
			dateSaisie: '2024-12-01',
			dateEcheance: '2024-12-15',
			libelleCompteTiers: 'GANDI SAS',
			libelleEcriture: 'INFORMATIQUE 08 3T23 SOLDE CDE N° 300',
			credit: '750.0',
			codeJournal: 'PREV',
			datePiece: '2024-12-01',
			rubriqueTreso: 'TELECOM', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV013',
			societe: 'Société J',
			dateSaisie: '2025-01-01',
			dateEcheance: '2025-01-15',
			libelleCompteTiers: 'OCTOPUSH',
			libelleEcriture: 'INFORMATIQUE 09 3T23 SOLDE CDE N° 318',
			credit: '1200.0',
			codeJournal: 'PREV',
			datePiece: '2025-01-01',
			rubriqueTreso: 'LOVERS', // Randomly assigned
			nomFichier: undefined, // Randomly assigned or left empty
		},
		{
			cle: 'PREV014',
			societe: 'Société K',
			dateSaisie: '2025-02-01',
			dateEcheance: '2025-02-15',
			libelleCompteTiers: 'ALIEXPRESS',
			libelleEcriture: 'INFORMATIQUE 10 4T24 SOLDE CDE N° 534',
			credit: '900.0',
			codeJournal: 'PREV',
			datePiece: '2025-02-01',
			rubriqueTreso: 'HONORAIRES', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV015',
			societe: 'Société L',
			dateSaisie: '2025-03-01',
			dateEcheance: '2025-03-15',
			libelleCompteTiers: 'AMAZON',
			libelleEcriture: 'DOCUMENTATION 11 4T24 SOLDE CDE N° 546',
			credit: '2000.0',
			codeJournal: 'PREV',
			datePiece: '2025-03-01',
			rubriqueTreso: 'ELECTRICITE-EAU', // Randomly assigned
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
		},
		{
			cle: 'PREV016',
			societe: 'Société M',
			dateSaisie: '2025-04-01',
			dateEcheance: '2025-04-15',
			libelleCompteTiers: 'AMAZON',
			libelleEcriture: 'DOCUMENTATION 11 4T24 SOLDE CDE N° 546',
			credit: '2000.0',
			codeJournal: 'PREV',
			datePiece: '2025-04-01',
			rubriqueTreso: 'CHARGES SALARIALES', // Randomly assigned
			nomFichier: undefined,
		},
	]

	// State for table data and filters
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [codeFilter, setCodeFilter] = useState('') // Only "Code" filter

	// Convert data for the table
	const convertToArrayWithGrouping = (datas: IPrevision[]): { rubrique: string; rows: (string | undefined)[][] }[] => {
		const groupedData = datas.reduce(
			(acc, data) => {
				const rubrique = data.rubriqueTreso || 'Non défini'
				if (!acc[rubrique]) {
					acc[rubrique] = []
				}
				acc[rubrique].push([
					data.societe || 'Non défini',
					data.cle || 'Non défini',
					data.dateSaisie || 'Non défini',
					data.dateEcheance || 'Non défini',
					data.libelleCompteTiers || 'Non défini',
					data.libelleEcriture || 'Non défini',
					data.credit ? parseFloat(data.credit).toFixed(2) : '0.00',
					data.nomFichier || 'Aucun Fichier', // Ensure this is the last element
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

	// Update table data with mocked data
	// Update table data with mocked data
	useEffect((): void => {
		setBodyArray(convertToArrayWithGrouping(mockedPrevisions))
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
						{convertToArrayWithGrouping(mockedPrevisions).map((group, groupIndex) => (
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
										if (rowData) {
											// Find the corresponding prevision via "cle"
											const cle = rowData[1] // The second field is the unique key
											const matchedPrevision = mockedPrevisions.find((prevision) => prevision.cle === cle)

											if (matchedPrevision) {
												const rowDetails = {
													societe: matchedPrevision.societe || 'Non défini',
													cle: matchedPrevision.cle || 'Non défini',
													dateSaisie: matchedPrevision.dateSaisie || 'Non défini',
													dateEcheance: matchedPrevision.dateEcheance || 'Non défini',
													fournisseur: matchedPrevision.libelleCompteTiers || 'Non défini',
													libelleEcriture: matchedPrevision.libelleEcriture || 'Non défini',
													montant: matchedPrevision.credit ? parseFloat(matchedPrevision.credit).toFixed(2) : '0.00',
													rubriqueTreso: matchedPrevision.rubriqueTreso || 'Non défini',
													nomFichier: matchedPrevision.nomFichier || 'Aucun fichier',
												}

												console.log('Clicked Row Details:', rowDetails)
												// navigate(`/details_prevision_valider/${cle}`, { state: { fullRowDetails: rowDetails } })
											} else {
												console.error('Aucune prévision correspondante trouvée pour la clé:', cle)
											}
										}
									}}
								/>
							</div>
						))}
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
