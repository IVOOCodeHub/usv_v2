import './dateRange.scss'
import Button from '../button/Button'
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { useState } from 'react'

interface DateRangeProps {
	onFilter: (minDate: string, maxDate: string) => void
	onCancel?: () => void
	buttonLabels?: { validate: string; cancel: string }
}

const DateRange = ({ onFilter, onCancel, buttonLabels }: DateRangeProps) => {
	const [minDate, setMinDate] = useState<string>('')
	const [maxDate, setMaxDate] = useState<string>('')
	const navigate: NavigateFunction = useNavigate()
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

		console.log('minDate : ', minDate)
		console.log('maxDate : ', maxDate)

		onFilter(minDate, maxDate)
		// Naviguer vers une autre page avec les dates
		// navigate('/commandes/tresorerie/prevision_a_ordonnancer', { state: { minDate, maxDate } })
	}

	return (
		<div>
			<form onSubmit={handleDateSubmit} className='DateRange__container'>
				<div className='dateContainer'>
					<div className='inputWrapper'>
						<label htmlFor='minDate'>Date mini : </label>
						<input
							id='minDate'
							name='minDate'
							type='date'
							value={minDate}
							onChange={(e) => setMinDate(e.target.value)} // Met à jour l'état `minDate`
						/>
					</div>
					<div className='inputWrapper'>
						<label htmlFor='maxDate'>Date maxi : </label>
						<input
							id='maxDate'
							name='maxDate'
							type='date'
							value={maxDate}
							onChange={(e) => setMaxDate(e.target.value)} // Met à jour l'état `maxDate`
						/>
					</div>
				</div>
				<div className='buttonContainer'>
					<div className='buttonWrapper'>
						<Button
							props={{
								style: 'blue',
								text: 'Valider',
								type: 'submit', // Déclenche l'envoi du formulaire
							}}
						/>
						<Button
							props={{
								style: 'grey',
								text: 'Annuler',
								type: 'button',
								onClick: (): void => navigate(-1), // Retourne à la page précédente
							}}
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default DateRange
