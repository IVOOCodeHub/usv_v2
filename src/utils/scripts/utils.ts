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
