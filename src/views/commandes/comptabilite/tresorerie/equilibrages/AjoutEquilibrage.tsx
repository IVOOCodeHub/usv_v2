import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import './ajoutEquilibrage.scss'
import { mockedEquilibrages } from './mock/mockedEquilibrages'

const AjoutEquilibrage: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const rowDetails = location.state?.rowDetails

	const [emetteurCompte, setEmetteurCompte] = useState('')
	const [montant, setMontant] = useState('')
	const [mois, setMois] = useState('')
	const [annee, setAnnee] = useState('')
	const [dateOrdo, setDateOrdo] = useState('')
	const [errors, setErrors] = useState({
		emetteurCompte: false,
		montant: false,
		mois: false,
		annee: false,
		dateOrdo: false,
	})

	// Liste des comptes bancaires excluant celui du destinataire
	const comptesBancaires = mockedEquilibrages
		.map((item) => item.compte)
		.filter((compte) => compte !== rowDetails?.compte)

	const moisOptions = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre',
	]
	const anneeOptions = ['2024', '2025', '2026', '2027']

	const handleValidate = (e: React.FormEvent) => {
		e.preventDefault()

		const newErrors = {
			emetteurCompte: emetteurCompte.trim() === '',
			montant: montant.trim() === '',
			mois: mois.trim() === '',
			annee: annee.trim() === '',
			dateOrdo: dateOrdo.trim() === '',
		}

		setErrors(newErrors)

		if (Object.values(newErrors).includes(true)) {
			return
		}

		alert('Équilibrage validé')
		navigate(-1)
	}

	useEffect(() => {
		if (!rowDetails) {
			navigate('/commandes/tresorerie/equilibrages')
		}
	}, [rowDetails, navigate])

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | CRÉATION ÉQUILIBRAGE' }} />
			<main id='ajoutEquilibrage'>
				<section className='equilibrage-container'>
					{/* Section ÉMETTEUR */}
					<div className='equilibrage-section emetteur'>
						<h2>ÉMETTEUR</h2>

						<label htmlFor='compteEmetteur'>Compte bancaire</label>
						<select
							id='compteEmetteur'
							value={emetteurCompte}
							onChange={(e) => {
								setEmetteurCompte(e.target.value)
								setErrors((prev) => ({ ...prev, emetteurCompte: false })) // Remove error on change
							}}
							className={errors.emetteurCompte ? 'error-border' : ''}
						>
							<option value=''>Choisir...</option>
							{comptesBancaires.map((compte) => (
								<option key={compte} value={compte}>
									{compte}
								</option>
							))}
						</select>
						{errors.emetteurCompte && <p className='error-message'>Merci de remplir ce champ.</p>}
						<label htmlFor='montant'>Montant</label>
						<input
							type='number'
							id='montant'
							value={montant}
							onChange={(e) => {
								setMontant(e.target.value)
								setErrors((prev) => ({ ...prev, montant: false }))
							}}
							placeholder='0.00'
							className={errors.montant ? 'error-border' : ''}
						/>
						{errors.montant && <p className='error-message'>Merci de remplir ce champ.</p>}
						<label htmlFor='libelleEcriture'>Libellé écriture</label>
						<div className='libelle-container'>
							<span>EQUILIB</span>
							<select
								id='libelleEcriture'
								value={mois}
								className={errors.emetteurCompte ? 'error-border' : ''}
								onChange={(e) => {
									setMois(e.target.value)
									setErrors((prev) => ({ ...prev, mois: false }))
								}}
							>
								<option value=''>Mois</option>
								{moisOptions.map((m) => (
									<option key={m} value={m}>
										{m}
									</option>
								))}
							</select>
							{errors.mois && <p className='error-message'>Merci de choisir une option.</p>}
							<select
								id='annee'
								value={annee}
								className={errors.annee ? 'error-border' : ''}
								onChange={(e) => {
									setAnnee(e.target.value)
									setErrors((prev) => ({ ...prev, annee: false }))
								}}
							>
								<option value=''>Année</option>
								{anneeOptions.map((a) => (
									<option key={a} value={a}>
										{a}
									</option>
								))}
							</select>
							{errors.annee && <p className='error-message'>Merci de choisir une option.</p>}
						</div>

						<label htmlFor='dateOrdo'>Date ordonnancement</label>
						<input
							type='date'
							id='dateOrdo'
							value={dateOrdo}
							className={errors.dateOrdo ? 'error-border' : ''}
							onChange={(e) => {
								setDateOrdo(e.target.value)
								setErrors((prev) => ({ ...prev, dateOrdo: false }))
							}}
						/>
						{errors.dateOrdo && <p className='error-message'>Merci de remplir ce champ.</p>}
					</div>

					{/* Section DESTINATAIRE */}
					<div className='equilibrage-section destinataire'>
						<h2>DESTINATAIRE</h2>
						<p>
							<strong>Banque :</strong> <span className='details-value'>{rowDetails?.banque}</span>
						</p>
						<p>
							<strong>Compte :</strong> <span className='details-value'>{rowDetails?.compte}</span>
						</p>
						<p>
							<strong>Société :</strong> <span className='details-value'>{rowDetails?.societe}</span>
						</p>
						<p>
							<strong>Solde au {rowDetails?.dernierImport ?? ''} :</strong>{' '}
							<span className='details-value-right'>{rowDetails?.dernierSolde ?? ''}</span>
						</p>
						<p>
							<strong>Emis Non Décaissés :</strong>{' '}
							<span className='details-value-right'>{rowDetails?.emisNonDecaisse ?? ''}</span>
						</p>
						<p>
							<strong>Solde prévu :</strong>{' '}
							<span className='details-value-right'>{rowDetails?.soldeApresEND ?? ''}</span>
						</p>
						<p>
							<strong>Découvert Autorisé :</strong>{' '}
							<span className='details-value-right'>{rowDetails?.decouvertAutorise ?? ''}</span>
						</p>
						<p>
							<strong>Mobilisable :</strong>{' '}
							<span className='details-value-right'>{rowDetails?.mobilisable ?? ''}</span>
						</p>
						<p>
							<strong>Ordonnancés :</strong> <span className='details-value-right'>{rowDetails?.ordo ?? ''}</span>
						</p>
						<p>
							<strong>Solde :</strong> <span className='details-value-right'>{rowDetails?.soldeApresOrdo ?? ''}</span>
						</p>
					</div>
				</section>

				<form onSubmit={handleValidate}>
					<div className='button-wrapper'>
						<Button props={{ style: 'blue', text: 'Valider', type: 'submit' }} />
						<Button props={{ style: 'grey', text: 'Annuler', type: 'button', onClick: () => navigate(-1) }} />
					</div>
				</form>
			</main>
		</>
	)
}

export default AjoutEquilibrage
