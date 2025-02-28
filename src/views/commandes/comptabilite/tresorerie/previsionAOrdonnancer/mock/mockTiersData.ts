const mockTiersData = {
	header: {
		nomTiers: 'URSSAF POITOU-CHARENTES',
		codeTiers: '910',
	},
	coordonnees: {
		societe: 'URSSAF POITOU-CHARENTES',
		activite: 'Charges sociales',
		rubrique: 'CHARGES SALARIALES',
		ape: 'NC',
		siret: '12345678901234',
		formeJuridique: 'Association',
		adresse: {
			rue: '12 rue de la Solidarité',
			complement: 'Bâtiment A',
			cp: '86000',
			ville: 'Poitiers',
			pays: 'France',
		},
		responsable: {
			civilite: 'Monsieur',
			nom: 'Martin',
			telephone: '0549494949',
			mobile: '0612121212',
			fax: '0549494950',
			email: 'responsable@urssaf.fr',
		},
		contactI: {
			civilite: 'Madame',
			nom: 'Durand',
			telephone: '0549494940',
			mobile: '0610101010',
			fax: '0549494951',
			email: 'contact1@urssaf.fr',
		},
		contactII: {
			civilite: 'Monsieur',
			nom: 'Dupont',
			telephone: '0549494930',
			mobile: '0613131313',
			fax: '0549494952',
			email: 'contact2@urssaf.fr',
		},
		site: {
			adresseSiteWeb: 'www.urssaf.fr',
			identifiantSite: 'urs910',
			motDePasseSite: 'securePass123',
		},
	},
	compta: {
		compteGeneral: '43100000',
		compteCharge: '64510000',
		compteTiers: 'A0910',
		intituleCompte: 'URSSAF POITOU-CHARENTES',
		typeCompte: 'Fournisseur',
		assujettiTVA: 'Non',
		tauxTVA: '0 - Taux 0 ou non applicable',
		interco: 'Non',
		bic: 'CMBRFR2BCME',
		iban: {
			codePays: 'FR',
			clePays: '76',
			codeBanque: '18829',
			codeGuichet: '75416',
			numeroCompte: '6712551740',
			cleRIB: '63',
		},
	},
	treso: {
		modePaiement: 'Prélèvement',
		partenairePayeur: 'Non',
		delaiReglement: '30 jours',
		beneficiaireEnregistre: 'Oui',
		banqueEnregistre: 'Aucune',
		recurrent: 'Non',
	},
}

export default mockTiersData
