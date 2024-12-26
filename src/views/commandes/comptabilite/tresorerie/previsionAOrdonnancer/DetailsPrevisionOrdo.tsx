import './previsionAOrdonnancer.scss'

// hooks | libraries
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, ReactElement } from 'react'

// components
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'

// types
interface ILocationState {
	state: {
		rowData: string[]
	}
}

const DetailsPrevisionOrdo = (): ReactElement => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState
	const [courrier, setCourrier] = useState<string | null>(null)
	const [details, setDetails] = useState<Record<string, string>>({})
	const [previsionCode, setPrevisionCode] = useState<string>('')

	// Extract rowData from location state
	useEffect(() => {
		if (location.state && location.state.rowData) {
			const rowData = location.state.rowData
			setDetails({
				code: rowData[0],
				echeance: rowData[1],
				ordo: rowData[2],
				fournisseur: rowData[3],
				libelle: rowData[4],
				destinataire: rowData[5],
				montant: rowData[6],
			})

			setPrevisionCode(rowData[0])
			// Simulate fetching courrier based on the rowData code
			setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${rowData[0]}.pdf}`)
		}
	}, [location.state])

	return (
		<>
			<Header
				props={{
					pageURL: `GIVOO | TRÉSORERIE | DÉTAILS PRÉVISION ORDONNANCER ${previsionCode}`,
				}}
			/>
			<main id='detailsPrevisionOrdo'>
				<div className='detailsContainer'>
					{/* Left side: Courrier display */}
					<div className='leftSide'>
						{courrier ? (
							<iframe src={courrier} title='Courrier associé' className='courrierDisplay' />
						) : (
							<p>Aucun courrier associé</p>
						)}
					</div>

					{/* Right side: Details and actions */}
					<div className='rightSide'>
						<h3>Prévision {details.code}</h3>
						<div className='detailsWrapper'>
							<p>
								<strong>Date saisie :</strong> {new Date().toLocaleString()}
							</p>
							<p>
								<strong>Société :</strong> {details.fournisseur}
							</p>
							<p>
								<strong>Tiers :</strong> {details.destinataire}
							</p>
							<p>
								<strong>Rubrique :</strong> {details.libelle}
							</p>
							<p>
								<strong>Date échéance :</strong> {details.echeance}
							</p>
							<p>
								<strong>Date ordo. :</strong> {details.ordo}
							</p>
							<p>
								<strong>Montant :</strong> {details.montant} €
							</p>
						</div>
						<div className='buttonWrapper'>
							<Button
								props={{
									style: 'blue',
									text: 'Ok',
									type: 'button',
									onClick: () => alert('Prévision validée'),
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
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default DetailsPrevisionOrdo
