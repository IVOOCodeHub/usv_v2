import { IPrevision } from '../../utils/types/prevision.interface'
import { convertENDateToFr } from '../../utils/scripts/utils.ts'

export interface IServerPrevision {
	cle: string
	societe: string
	code_journal: string
	date_piece: string
	date_saisie: string
	auteur_saisie: string
	no_compte_general: string
	libelle_compte_general: string
	no_compte_tiers: string
	libelle_compte_tiers: string
	cle_rubrique_treso: string
	rubrique_treso: string
	libelle_ecriture_prefixe: string
	libelle_ecriture_mois: string
	libelle_ecriture_annee: string
	libelle_ecriture_trimestre: string
	libelle_ecriture_beneficiaire: string
	libelle_ecriture: string
	date_echeance: string
	no_semaine_echeance: string
	date_ordo: string
	no_semaine_ordo: string
	debit: string
	credit: string
	code_operation: string
	cle_ecriture: string
	compte_regroupement: string
	no_compte_banque: string
	date_paiement: string
	mode_reglement: string
	statut: string
	dh_statut: string
	auteur_statut: string
	manu: string
	commentaire: string
	date_solde: string
	ref_source_tiers: string
	cle_courrier: string
	reference_paiement: string
	cle_facture: string
	cle_budget: string
	cle_commande: string
	code_tiers_payeur: string
	inter: string
	cle_accord_partenaire: string
	marque: string
	mat_mark: string
	avec_tva: string
	taux_tva1: string
	montant_tva1: string
	taux_tva2: string
	montant_tva2: string
	taux_tva3: string
	montant_tva3: string
	taux_tva4: string
	montant_tva4: string
	taux_tva5: string
	montant_tva5: string
	cle_prelevement: string
	cle_etale: string
	nomFichier: string
}

export const previsionModel = (serverPrevision: IServerPrevision): IPrevision => {
	console.log('Données entrantes dans previsionModel :', serverPrevision)
	const transformedPrevision = {
		cle: serverPrevision.cle,
		societe: serverPrevision.societe || 'Non défini',
		codeJournal: serverPrevision.code_journal || 'Non défini',
		datePiece: serverPrevision.date_piece ? convertENDateToFr(serverPrevision.date_piece) : 'Non défini',
		dateSaisie: serverPrevision.date_saisie ? convertENDateToFr(serverPrevision.date_saisie) : 'Non défini',
		auteurSaisie: serverPrevision.auteur_saisie || 'Non défini',
		noCompteGeneral: serverPrevision.no_compte_general || 'Non défini',
		libelleCompteGeneral: serverPrevision.libelle_compte_general || 'Non défini',
		noCompteTiers: serverPrevision.no_compte_tiers || 'Non défini',
		libelleCompteTiers: serverPrevision.libelle_compte_tiers || 'Non défini',
		cleRubriqueTreso: serverPrevision.cle_rubrique_treso || 'Non défini',
		rubriqueTreso: serverPrevision.rubrique_treso || 'Non défini',
		libelleEcriturePrefixe: serverPrevision.libelle_ecriture_prefixe || 'Non défini',
		libelleEcritureMois: serverPrevision.libelle_ecriture_mois || 'Non défini',
		libelleEcritureAnnee: serverPrevision.libelle_ecriture_annee || 'Non défini',
		libelleEcritureTrimestre: serverPrevision.libelle_ecriture_trimestre || 'Non défini',
		libelleEcritureBeneficiaire: serverPrevision.libelle_ecriture_beneficiaire || 'Non défini',
		libelleEcriture: serverPrevision.libelle_ecriture || 'Non défini',
		dateEcheance: serverPrevision.date_echeance ? convertENDateToFr(serverPrevision.date_echeance) : 'Non défini',
		noSemaineEcheance: serverPrevision.no_semaine_echeance || 'Non défini',
		dateOrdo: serverPrevision.date_ordo ? convertENDateToFr(serverPrevision.date_ordo) : 'Non défini',
		noSemaineOrdo: serverPrevision.no_semaine_ordo || 'Non défini',
		debit: serverPrevision.debit || 'Non défini',
		credit: serverPrevision.credit || 'Non défini',
		codeOperation: serverPrevision.code_operation || 'Non défini',
		cleEcriture: serverPrevision.cle_ecriture || 'Non défini',
		compteRegroupement: serverPrevision.compte_regroupement || 'Non défini',
		noCompteBanque: serverPrevision.no_compte_banque || 'Non défini',
		datePaiement: serverPrevision.date_paiement ? convertENDateToFr(serverPrevision.date_paiement) : 'Non défini',
		modeReglement: serverPrevision.mode_reglement || 'Non défini',
		statut: serverPrevision.statut || 'Non défini',
		dhStatut: serverPrevision.dh_statut ? convertENDateToFr(serverPrevision.dh_statut) : 'Non défini',
		auteurStatut: serverPrevision.auteur_statut || 'Non défini',
		manu: serverPrevision.manu || 'Non défini',
		commentaire: serverPrevision.commentaire || 'Non défini',
		dateSolde: serverPrevision.date_solde ? convertENDateToFr(serverPrevision.date_solde) : 'Non défini',
		refSourceTiers: serverPrevision.ref_source_tiers || 'Non défini',
		cleCourrier: serverPrevision.cle_courrier || 'Non défini',
		referencePaiement: serverPrevision.reference_paiement || 'Non défini',
		cleFacture: serverPrevision.cle_facture || 'Non défini',
		cleBudget: serverPrevision.cle_budget || 'Non défini',
		cleCommande: serverPrevision.cle_commande || 'Non défini',
		codeTiersPayeur: serverPrevision.code_tiers_payeur || 'Non défini',
		inter: serverPrevision.inter || 'Non défini',
		cleAccordPartenaire: serverPrevision.cle_accord_partenaire || 'Non défini',
		marque: serverPrevision.marque || 'Non défini',
		matMark: serverPrevision.mat_mark || 'Non défini',
		avecTva: serverPrevision.avec_tva || 'Non défini',
		tauxTva1: serverPrevision.taux_tva1 || 'Non défini',
		montantTva1: serverPrevision.montant_tva1 || 'Non défini',
		tauxTva2: serverPrevision.taux_tva2 || 'Non défini',
		montantTva2: serverPrevision.montant_tva2 || 'Non défini',
		tauxTva3: serverPrevision.taux_tva3 || 'Non défini',
		montantTva3: serverPrevision.montant_tva3 || 'Non défini',
		tauxTva4: serverPrevision.taux_tva4 || 'Non défini',
		montantTva4: serverPrevision.montant_tva4 || 'Non défini',
		tauxTva5: serverPrevision.taux_tva5 || 'Non défini',
		montantTva5: serverPrevision.montant_tva5 || 'Non défini',
		clePrelevement: serverPrevision.cle_prelevement || 'Non défini',
		cleEtale: serverPrevision.cle_etale || 'Non défini',
		nomFichier: serverPrevision.nomFichier || 'Non défini',
	}

	console.log('Prevision transformée :', transformedPrevision)

	return transformedPrevision
}
