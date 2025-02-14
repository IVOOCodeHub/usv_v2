export const isOnProduction: boolean = false

export const convertENDateToFr = (dateString: string): string => {
	const date = new Date(dateString)

	const day: string = String(date.getDate()).padStart(2, '0') // Ajoute un zéro si le jour est inférieur à 10
	const month: string = String(date.getMonth() + 1).padStart(2, '0') // Les mois commencent à 0 donc on ajoute +1
	const year: number = date.getFullYear()

	return `${day}/${month}/${year}`
}

export const convertFrDateToEn = (dateString: string): string => {
	const date = new Date(dateString)

	const day: string = String(date.getDate()).padStart(2, '0')
	const month: string = String(date.getMonth() + 1).padStart(2, '0')
	const year: number = date.getFullYear()

	return `${year}-${day}-${month}`
}

// modification de la fonction pour accepter les dates au format DD/MM/YYYY, LT 23/12/2024
export const convertFrDateToServerDate = (dateString: string): string => {
	if (!dateString) return '' // Retourne une chaîne vide si la date est vide

	// Si la date est déjà au format YYYY-MM-DD
	if (dateString.includes('-')) {
		const [year, month, day] = dateString.split('-')
		if (!year || !month || !day) return ''
		return `${year}-${month}-${day}`
	}

	// Si la date est au format DD/MM/YYYY
	const [day, month, year] = dateString.split('/')
	if (!day || !month || !year) return ''
	return `${year}-${month}-${day}`
}

// Formater les montants en euros
export const keepTwoDecimals = (number: number): string =>
	new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(number)

// formater les dates pour remplir les inputs de type date
export const formatDateToHtml = (date: string): string => {
	if (!date || !date.includes('/')) return '' // Vérifie que la date est au format attendu DD/MM/YYYY
	const [day, month, year] = date.split('/')
	if (day && month && year) {
		return `${year}-${month}-${day}` // Convertit au format YYYY-MM-DD
	}
	console.warn('Format de date invalide pour HTML :', date)
	return '' // Retourne une chaîne vide en cas de format invalide
}

// Validation et conversion de la date pour l'envoie de la requête à l'API
export const validateAndConvertDateForApi = (dateString: string): string => {
	if (!dateString) return '' // Si vide, retourne une chaîne vide

	if (dateString.includes('-')) {
		// Format YYYY-MM-DD attendu
		const [year, month, day] = dateString.split('-')
		if (year && month && day) {
			return `${year}-${month}-${day}`
		}
	} else if (dateString.includes('/')) {
		// Format DD/MM/YYYY attendu
		const [day, month, year] = dateString.split('/')
		if (day && month && year) {
			return `${year}-${month}-${day}`
		}
	}

	console.warn(`Date invalide : ${dateString}`)
	return '' // Retourne une chaîne vide si format non reconnu
}

// Outil pour éclater les IBAN en plusieurs champs si jamais certains champs de l'IBAN sont manquants ou invalides

export const parseIBAN = (iban: string) => {
	if (!iban || iban.length < 27) return null

	// Extract parts of the IBAN
	const ibanCodePays = iban.slice(0, 2) // First 2 characters (country code)
	const ibanClePays = iban.slice(2, 4) // Next 2 characters (check digits)
	const ibanCodeBanque = iban.slice(4, 9) // Next 5 characters (bank code)
	const ibanCodeGuichet = iban.slice(9, 14) // Next 5 characters (branch code)
	const ibanNoCompte = iban.slice(14, 25) // Next 11 characters (account number)
	const ibanCleRib = iban.slice(25, 27) // Last 2 characters (RIB key)

	return {
		iban_code_pays: ibanCodePays,
		iban_cle_pays: ibanClePays,
		iban_code_banque: ibanCodeBanque,
		iban_code_guichet: ibanCodeGuichet,
		iban_no_compte: ibanNoCompte,
		iban_cle_rib: ibanCleRib,
	}
}

export const calculate20TVA = (amount: number): number => {
	const tva20 = amount * 0.2
	return tva20
}

export const calculate10TVA = (amount: number): number => {
	const tva10 = amount * 0.1
	return tva10
}
