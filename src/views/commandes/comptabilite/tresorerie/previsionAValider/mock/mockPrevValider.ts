import { IPrevision } from '../../../../../../utils/types/prevision.interface'

// Mocked data (replace with API call later)
export const mockedPrevisions: IPrevision[] = [
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
