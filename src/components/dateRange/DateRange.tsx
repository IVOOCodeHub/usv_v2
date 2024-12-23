import './dateRange.scss'
import Button from '../button/Button'
import { useState } from 'react'

interface DateRangeProps {
	onFilter: (minDate: string, maxDate: string) => void // Fonction appelée avec les dates validées
	defaultMinDate?: string // Date mini par défaut
	defaultMaxDate?: string // Date maxi par défaut
	onCancel?: () => void // Fonction appelée lors de l'annulation
	buttonLabels?: { validate: string; cancel: string } // Libellés personnalisés des boutons
}

const DateRange = ({
	onFilter,
	defaultMinDate,
	defaultMaxDate,
	onCancel,
	buttonLabels = { validate: 'Valider', cancel: 'Annuler' },
}: DateRangeProps) => {
	// États pour les dates
	const [minDate, setMinDate] = useState<string>(defaultMinDate ?? '')
	const [maxDate, setMaxDate] = useState<string>(defaultMaxDate ?? '')

	// Fonction pour valider les dates et appeler la méthode onFilter
	const handleDateSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		if (!minDate || !maxDate) {
			console.error('Veuillez sélectionner les deux dates.')
			return
		}

		if (new Date(minDate) > new Date(maxDate)) {
			alert('La date minimale ne peut pas être supérieure à la date maximale.')
			return
		}

		console.log('Dates validées :', { minDate, maxDate })
		onFilter(minDate, maxDate) // Appelle la fonction parent avec les dates validées
	}

	return (
		<div className='DateRange__container'>
			<form onSubmit={handleDateSubmit} className='DateRange__form'>
				<div className='dateContainer'>
					<div className='inputWrapper'>
						<label htmlFor='minDate'>Date mini : </label>
						<input
							id='minDate'
							name='minDate'
							type='date'
							value={minDate}
							onChange={(e) => setMinDate(e.target.value)}
						/>
					</div>
					<div className='inputWrapper'>
						<label htmlFor='maxDate'>Date maxi : </label>
						<input
							id='maxDate'
							name='maxDate'
							type='date'
							value={maxDate}
							onChange={(e) => setMaxDate(e.target.value)}
						/>
					</div>
				</div>
				<div className='buttonContainer'>
					<div className='buttonWrapper'>
						<Button
							props={{
								style: 'blue',
								text: buttonLabels.validate,
								type: 'submit',
							}}
						/>
						{onCancel && (
							<Button
								props={{
									style: 'grey',
									text: buttonLabels.cancel,
									type: 'button',
									onClick: onCancel, // Appelle la fonction `onCancel` si définie
								}}
							/>
						)}
					</div>
				</div>
			</form>
		</div>
	)
}

export default DateRange
