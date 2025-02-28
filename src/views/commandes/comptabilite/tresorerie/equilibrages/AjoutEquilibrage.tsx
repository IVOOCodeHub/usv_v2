import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
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

	useEffect(() => {
		if (!rowDetails) {
			navigate('/commandes/tresorerie/equilibrages')
		}
	}, [rowDetails, navigate])

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | AJOUT ÉQUILIBRAGE' }} />
			<main id='ajoutEquilibrage'>
				<section className='equilibrage-container'>
					{/* Section ÉMETTEUR */}
					<div className='equilibrage-section emetteur'>
						<h2>ÉMETTEUR</h2>

						<label htmlFor='compteEmetteur'>Compte bancaire</label>
						<select id='compteEmetteur' value={emetteurCompte} onChange={(e) => setEmetteurCompte(e.target.value)}>
							<option value=''>Choisir...</option>
							{comptesBancaires.map((compte) => (
								<option key={compte} value={compte}>
									{compte}
								</option>
							))}
						</select>

						<label htmlFor='montant'>Montant</label>
						<input
							type='number'
							id='montant'
							value={montant}
							onChange={(e) => setMontant(e.target.value)}
							placeholder='0.00'
						/>

						<label>Libellé écriture</label>
						<div className='libelle-container'>
							<span>EQUILIB</span>
							<select id='mois' value={mois} onChange={(e) => setMois(e.target.value)}>
								<option value=''>Mois</option>
								{moisOptions.map((m) => (
									<option key={m} value={m}>
										{m}
									</option>
								))}
							</select>
							<span>Année</span>
							<select id='annee' value={annee} onChange={(e) => setAnnee(e.target.value)}>
								<option value=''>Choisir...</option>
								{anneeOptions.map((a) => (
									<option key={a} value={a}>
										{a}
									</option>
								))}
							</select>
						</div>

						<label htmlFor='dateOrdo'>Date ordonnancement</label>
						<input type='date' id='dateOrdo' value={dateOrdo} onChange={(e) => setDateOrdo(e.target.value)} />
					</div>

					{/* Section DESTINATAIRE */}
					<div className='equilibrage-section destinataire'>
						<h2>DESTINATAIRE</h2>
						<p>
							<strong>Banque :</strong> {rowDetails?.banque}
						</p>
						<p>
							<strong>Compte :</strong> {rowDetails?.compte}
						</p>
						<p>
							<strong>Société :</strong> {rowDetails?.societe}
						</p>
					</div>
				</section>

				<div className='button-wrapper'>
					<Button
						props={{ style: 'blue', text: 'Valider', type: 'button', onClick: () => console.log('Équilibrage validé') }}
					/>
					<Button props={{ style: 'grey', text: 'Annuler', type: 'button', onClick: () => navigate(-1) }} />
				</div>
			</main>
			<Footer />
		</>
	)
}

export default AjoutEquilibrage
