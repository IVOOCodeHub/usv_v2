import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import './equilibrages.scss'

interface RowDetails {
	banque: string
	dernierImport: string
	compte: string
	societe: string
	dernierSolde: string
	emisNonDecaisse: string
	soldeApresEND: string
	decouvertAutorise: string
	mobilisable: string
	ordo: string
	soldeApresOrdo: string
	soldeApresEqui: string
}

const AjoutEquilibrage: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const [rowDetails, setRowDetails] = useState<RowDetails | null>(null)

	// Function to handle input change
	const handleInputChange = (field: keyof RowDetails, value: string) => {
		setRowDetails((prev) => {
			if (!prev) return null;
			return {
				...prev,
				[field]: value,
			};
		})
	}

	// Function to handle form submission
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		// Here you can add logic to submit the form data
		console.log('Form submitted:', rowDetails)
		navigate('/commandes/tresorerie/equilibrages')
	}

	// Function to handle cancel
	const handleCancel = () => {
		navigate('/commandes/tresorerie/equilibrages')
	}

	// Use effect to set row details from location state
	useEffect(() => {
		const { state } = location
		if (state && state.rowDetails) {
			setRowDetails(state.rowDetails)
		}
	}, [location])

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | AJOUT EQUILIBRAGE' }} />
			<main id='ajoutEquilibrage'>
				<section className='ajoutEquilibrage__bottomSection'>
					<div className='form-container'>
						<form onSubmit={handleSubmit}>
							<div className='form-group'>
								<label>
									Banque :
									<input
										type='text'
										value={rowDetails?.banque ?? ''}
										onChange={(e) => handleInputChange('banque', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Der.Import :
									<input
										type='date'
										value={rowDetails?.dernierImport ?? ''}
										onChange={(e) => handleInputChange('dernierImport', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Compte :
									<input
										type='text'
										value={rowDetails?.compte ?? ''}
										onChange={(e) => handleInputChange('compte', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Société :
									<input
										type='text'
										value={rowDetails?.societe ?? ''}
										onChange={(e) => handleInputChange('societe', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Dernier Solde :
									<input
										type='text'
										value={rowDetails?.dernierSolde ?? ''}
										onChange={(e) => handleInputChange('dernierSolde', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Emis Non Décaissé :
									<input
										type='text'
										value={rowDetails?.emisNonDecaisse ?? ''}
										onChange={(e) => handleInputChange('emisNonDecaisse', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Solde après E.N.D. :
									<input
										type='text'
										value={rowDetails?.soldeApresEND ?? ''}
										onChange={(e) => handleInputChange('soldeApresEND', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Découvert Autorisé :
									<input
										type='text'
										value={rowDetails?.decouvertAutorise ?? ''}
										onChange={(e) => handleInputChange('decouvertAutorise', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Mobilisable :
									<input
										type='text'
										value={rowDetails?.mobilisable ?? ''}
										onChange={(e) => handleInputChange('mobilisable', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Ordo :
									<input
										type='text'
										value={rowDetails?.ordo ?? ''}
										onChange={(e) => handleInputChange('ordo', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Solde après Ordo :
									<input
										type='text'
										value={rowDetails?.soldeApresOrdo ?? ''}
										onChange={(e) => handleInputChange('soldeApresOrdo', e.target.value)}
									/>
								</label>
							</div>
							<div className='form-group'>
								<label>
									Solde après Equi :
									<input
										type='text'
										value={rowDetails?.soldeApresEqui ?? ''}
										onChange={(e) => handleInputChange('soldeApresEqui', e.target.value)}
									/>
								</label>
							</div>
							<div className='button-wrapper'>
								<Button props={{ style: 'blue', text: 'Ajouter', type: 'submit' }} />
								<Button props={{ style: 'grey', text: 'Annuler', type: 'button', onClick: handleCancel }} />
							</div>
						</form>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default AjoutEquilibrage
