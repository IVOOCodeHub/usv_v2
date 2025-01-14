import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPrevision } from '../../../../../utils/types/prevision.interface.ts'
import Header from '../../../../../components/header/Header'
import NRTL from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import DateRange from '../../../../../components/dateRange/DateRange'
import './previsionAValider.scss'

type RowDetails = {
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
			rubriqueTreso: 'BANQUE',
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
			dateOrdo: '2024-01-10', // New field
			noCompteBanque: '000257117126 - SOCIETE GENERALE', // New field
			modeReglement: 'PRELEV', // New field
			statut: 'Enregistrer (reste au même stade)', // New field
			refSourceTiers: 'REF001', // New field
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
			rubriqueTreso: 'NOTE DE FRAIS',
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
			dateOrdo: '2024-02-15', // New field
			noCompteBanque: '000257117127 - BNP PARIBAS', // New field
			modeReglement: 'CHEQUE', // New field
			statut: 'Prévision ordonnancée', // New field
			refSourceTiers: 'REF002', // New field
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
			rubriqueTreso: 'FOURNISSEURS',
			nomFichier: undefined,
			dateOrdo: '2024-03-10', // New field
			noCompteBanque: '000257117128 - CREDIT AGRICOLE', // New field
			modeReglement: 'VIR', // New field
			statut: 'Prévision rejetée', // New field
			refSourceTiers: 'REF003', // New field
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
			rubriqueTreso: 'TELECOM',
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
			dateOrdo: '2024-04-10', // New field
			noCompteBanque: '000257117129 - LA BANQUE POSTALE', // New field
			modeReglement: 'PRELEV', // New field
			statut: 'Litige', // New field
			refSourceTiers: 'REF004', // New field
		},
		// Add the remaining 12 rows with the same structure
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
			rubriqueTreso: 'LOVERS',
			nomFichier: '2023_01\\20230106_17_03_54.pdf',
			dateOrdo: '2024-05-10', // New field
			noCompteBanque: '000257117130 - HSBC', // New field
			modeReglement: 'CHEQUE', // New field
			statut: 'Enregistrer (reste au même stade)', // New field
			refSourceTiers: 'REF005', // New field
		},
		// Continue adding rows 6 to 16 with the same structure...
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

	// Function to get row details
	const getRowDetails = (cle: string): RowDetails | undefined => {
		const matchedPrevision = mockedPrevisions.find((prevision) => prevision.cle === cle)
		if (!matchedPrevision) return undefined

		return {
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
	}

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
