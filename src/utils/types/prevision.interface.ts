export interface IPrevision {
	cle: string
	societe: string
	codeJournal: string
	datePiece: string // Doit toujours être présent après transformation
	dateSaisie: string // Doit toujours être présent après transformation
	auteurSaisie?: string // Facultatif si non obligatoire dans certaines réponses
	noCompteGeneral?: string
	libelleCompteGeneral?: string
	noCompteTiers?: string
	libelleCompteTiers?: string
	cleRubriqueTreso?: string
	rubriqueTreso?: string
	libelleEcriturePrefixe?: string
	libelleEcritureMois?: string
	libelleEcritureAnnee?: string
	libelleEcritureTrimestre?: string
	libelleEcritureBeneficiaire?: string
	libelleEcriture?: string
	dateEcheance?: string // Marqué optionnel si parfois manquant
	noSemaineEcheance?: string
	dateOrdo?: string
	noSemaineOrdo?: string
	debit?: string
	credit?: string
	codeOperation?: string
	cleEcriture?: string
	compteRegroupement?: string
	noCompteBanque?: string
	datePaiement?: string
	modeReglement?: string
	statut?: string
	dhStatut?: string
	auteurStatut?: string
	manu?: string
	commentaire?: string
	dateSolde?: string
	refSourceTiers?: string
	cleCourrier?: string
	referencePaiement?: string
	cleFacture?: string
	cleBudget?: string
	cleCommande?: string
	codeTiersPayeur?: string
	inter?: string
	cleAccordPartenaire?: string
	marque?: string
	matMark?: string
	avecTva?: string
	tauxTva1?: string
	montantTva1?: string
	tauxTva2?: string
	montantTva2?: string
	tauxTva3?: string
	montantTva3?: string
	tauxTva4?: string
	montantTva4?: string
	tauxTva5?: string
	montantTva5?: string
	clePrelevement?: string
	cleEtale?: string
	nomFichier?: string // Facultatif pour les courriers
	montant?: string
}
