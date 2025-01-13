import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button'
import Footer from '../../../../../components/footer/Footer'
import { keepTwoDecimals } from '../../../../../utils/scripts/utils'
import './EtalementPrevisionTiers.scss' // Import the CSS file

const EtalementPrevisionTiers = () => {
	const navigate = useNavigate()
	const { tiersId } = useParams<{ tiersId: string }>() // Extract tiersId from the URL

	// Mocked data based on tiersId
	const mockedData = {
		societe: 'Example Société', // Mocked société
		libelleCompteTiers: 'Example Tiers', // Mocked tiers
		rubriqueTreso: 'Example Rubrique', // Mocked rubrique
		libelleEcriturePrefixe: 'Example Libellé Préfixe', // Mocked libellé préfixe
		contratTiers: 'Contrat Tiers Example', // Mocked identification contrat tiers
		modePaiement: 'PRELEV', // Mocked mode de paiement
		montant: '1000.00', // Mocked montant
		banqueCreditrice: '000257117126 - SOCIETE GENERALE', // Mocked banque créditrice
		frequence: 'M', // Mocked fréquence
		datePremierMouvement: '2024-01-01', // Mocked date premier mouvement
		dateDernierMouvement: '2024-12-31', // Mocked date dernier mouvement
	}

	// State for form fields (initialized with mocked data)
	const [formData, setFormData] = useState({
		contratTiers: mockedData.contratTiers,
		modePaiement: mockedData.modePaiement,
		montant: mockedData.montant,
		banqueCreditrice: mockedData.banqueCreditrice,
		frequence: mockedData.frequence,
		datePremierMouvement: mockedData.datePremierMouvement,
		dateDernierMouvement: mockedData.dateDernierMouvement,
	})

	// Handle form input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// Validation logic
		if (!formData.contratTiers) {
			alert("Veuillez saisir l'identification du contrat du tiers SVP !")
			return
		}
		if (formData.modePaiement === '-1') {
			alert('Veuillez indiquer le mode de paiement SVP !')
			return
		}
		if (!formData.montant || isNaN(Number(formData.montant))) {
			alert('Veuillez indiquer un montant valide SVP !')
			return
		}
		if (formData.banqueCreditrice === '-1') {
			alert('Veuillez choisir la banque créditrice SVP !')
			return
		}
		if (formData.frequence === '-1') {
			alert('Veuillez choisir la fréquence de paiement SVP !')
			return
		}
		if (!formData.datePremierMouvement) {
			alert('Veuillez indiquer la date du premier mouvement SVP !')
			return
		}
		if (!formData.dateDernierMouvement) {
			alert('Veuillez indiquer la date du dernier mouvement SVP !')
			return
		}

		// Mock API call or further processing
		const payload = {
			tiersId,
			...formData,
		}
		console.log('Payload with tiersId:', payload)
	}

	return (
		<>
			<Header
				props={{
					pageURL: `GIVOO | TRÉSORERIE | ÉTALEMENT PRÉVISION ${tiersId}`,
				}}
			/>
			<main id='etalementPrevisionTiers'>
				<div className='detailsContainer'>
					<h2>Étalement Prévision {tiersId}</h2>
					<form onSubmit={handleSubmit}>
						{/* Société (read-only) */}
						<div>
							<label>
								<strong>Société :</strong>
								<input type='text' value={mockedData.societe} readOnly />
							</label>
						</div>

						{/* Tiers (read-only) */}
						<div>
							<label>
								<strong>Tiers :</strong>
								<input type='text' value={mockedData.libelleCompteTiers} readOnly />
							</label>
						</div>

						{/* Identification contrat tiers */}
						<div>
							<label>
								<strong>Identification contrat tiers :</strong>
								<input
									type='text'
									name='contratTiers'
									value={formData.contratTiers}
									onChange={handleInputChange}
									required
								/>
							</label>
						</div>

						{/* Rubrique (read-only) */}
						<div>
							<label>
								<strong>Rubrique :</strong>
								<input type='text' value={mockedData.rubriqueTreso} readOnly />
							</label>
						</div>

						{/* Libellé préfixe (read-only) */}
						<div>
							<label>
								<strong>Libellé préfixe :</strong>
								<input type='text' value={mockedData.libelleEcriturePrefixe} readOnly />
							</label>
						</div>

						{/* Mode de paiement */}
						<div>
							<label>
								<strong>Mode de paiement :</strong>
								<select name='modePaiement' value={formData.modePaiement} onChange={handleInputChange} required>
									<option value='-1'>Choisir</option>
									<option value='PRELEV'>Prélèvement</option>
									<option value='VIR'>Virement</option>
								</select>
							</label>
						</div>

						{/* Montant */}
						<div>
							<label>
								<strong>Montant :</strong>
								<input
									type='number'
									name='montant'
									value={formData.montant}
									onChange={handleInputChange}
									step='0.01'
									required
								/>
							</label>
						</div>

						{/* Banque créditrice */}
						<div>
							<label>
								<strong>Banque créditrice :</strong>
								<select name='banqueCreditrice' value={formData.banqueCreditrice} onChange={handleInputChange} required>
									<option value='-1'>Choisir</option>
									<option value='000257117126 - SOCIETE GENERALE'>000257117126 - SOCIETE GENERALE</option>
									<option value='000257117127 - BNP PARIBAS'>000257117127 - BNP PARIBAS</option>
								</select>
							</label>
						</div>

						{/* Fréquence */}
						<div>
							<label>
								<strong>Fréquence :</strong>
								<select name='frequence' value={formData.frequence} onChange={handleInputChange} required>
									<option value='-1'>Choisir</option>
									<option value='M'>Mensuelle</option>
									<option value='B'>Bimestrielle</option>
									<option value='T'>Trimestrielle</option>
									<option value='S'>Semestrielle</option>
									<option value='A'>Annuelle</option>
								</select>
							</label>
						</div>

						{/* Date premier mouvement */}
						<div>
							<label>
								<strong>Date premier mouvement :</strong>
								<input
									type='date'
									name='datePremierMouvement'
									value={formData.datePremierMouvement}
									onChange={handleInputChange}
									required
								/>
							</label>
						</div>

						{/* Date dernier mouvement */}
						<div>
							<label>
								<strong>Date dernier mouvement :</strong>
								<input
									type='date'
									name='dateDernierMouvement'
									value={formData.dateDernierMouvement}
									onChange={handleInputChange}
									required
								/>
							</label>
						</div>

						{/* Form actions */}
						<div className='buttonWrapper'>
							<Button
								props={{
									style: 'blue',
									text: 'Ok',
									type: 'submit',
								}}
							/>
							<Button
								props={{
									style: 'grey',
									text: 'Annuler',
									type: 'button',
									onClick: () => navigate(-1),
								}}
							/>
						</div>
					</form>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default EtalementPrevisionTiers
