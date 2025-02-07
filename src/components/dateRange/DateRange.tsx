import './dateRange.scss'
import Button from '../button/Button'
import { useState, useEffect } from 'react'

interface DateRangeProps {
	labelMini?: string
	labelMaxi?: string
	defaultMinDate?: string
	defaultMaxDate?: string
	onFilter: (minDate: string, maxDate: string) => void
}

const DateRange = ({ labelMini, labelMaxi, defaultMinDate, defaultMaxDate, onFilter }: DateRangeProps) => {
	const [minDate, setMinDate] = useState<string>(defaultMinDate ?? '')
	const [maxDate, setMaxDate] = useState<string>(defaultMaxDate ?? '')

	useEffect(() => {
		// Assurez-vous que les valeurs par défaut sont bien appliquées à l'initialisation
		setMinDate(defaultMinDate ?? '')
		setMaxDate(defaultMaxDate ?? '')
	}, [defaultMinDate, defaultMaxDate])

	const handleFilterClick = (): void => {
		if (!minDate || !maxDate) {
			console.error('Veuillez sélectionner les deux dates.')
			return
		}

		if (new Date(minDate) > new Date(maxDate)) {
			console.error('La date minimale ne peut pas être supérieure à la date maximale.')
			return
		}

		onFilter(minDate, maxDate)
	}

	return (
		<div className='DateRange__container'>
			<div className='dateContainer'>
				<div className='inputWrapper'>
					<label htmlFor='minDate'>{labelMini ?? 'Date Mini'}</label>
					<input id='minDate' name='minDate' type='date' value={minDate} onChange={(e) => setMinDate(e.target.value)} />
				</div>
				<div className='inputWrapper'>
					<label htmlFor='maxDate'>{labelMaxi ?? 'Date Maxi'}</label>
					<input id='maxDate' name='maxDate' type='date' value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
				</div>
			</div>
			<div className='dateButtonWrapper'>
				<Button
					props={{
						style: 'blue',
						text: 'Filtrer',
						type: 'button',
						onClick: handleFilterClick,
					}}
				/>
			</div>
		</div>
	)
}

export default DateRange
