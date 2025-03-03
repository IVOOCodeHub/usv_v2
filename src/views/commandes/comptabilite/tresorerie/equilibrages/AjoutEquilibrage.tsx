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
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | CRÉATION ÉQUILIBRAGE' }} />
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

						<label htmlFor='libelleEcriture'>Libellé écriture</label>
						<div className='libelle-container'>
							<span>EQUILIB</span>
							<select id='libelleEcriture' value={mois} onChange={(e) => setMois(e.target.value)}>
								<option value=''>Mois</option>
								{moisOptions.map((m) => (
									<option key={m} value={m}>
										{m}
									</option>
								))}
							</select>
							<select id='annee' value={annee} onChange={(e) => setAnnee(e.target.value)}>
								<option value=''>Année</option>
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

				<div className='button-wrapper'>
					<Button
						props={{ style: 'blue', text: 'Valider', type: 'button', onClick: () => console.log('Équilibrage validé') }}
					/>
					<Button props={{ style: 'grey', text: 'Annuler', type: 'button', onClick: () => navigate(-1) }} />
				</div>
			</main>
		</>
	)
}

export default AjoutEquilibrage
