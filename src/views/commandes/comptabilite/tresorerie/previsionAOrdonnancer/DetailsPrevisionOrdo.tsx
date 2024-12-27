import './previsionAOrdonnancer.scss'

// hooks | libraries
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, ReactElement, useContext } from 'react'
import { keepTwoDecimals } from '../../../../../utils/scripts/utils.ts'

// components
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'

// context
import { UserContext } from '../../../../../context/userContext.tsx'

// types
interface ILocationState {
	state: {
		rowData: string[]
	}
}

const DetailsPrevisionOrdo = (): ReactElement => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState

	// Récupérer les userCredentials depuis le UserContext
	const { userCredentials } = useContext(UserContext)

	const [courrier, setCourrier] = useState<string | null>(null)
	const [details, setDetails] = useState<Record<string, string | number>>({})
	const [previsionCode, setPrevisionCode] = useState<string>('')

	const extractNumericValue = (formattedValue: string): number => {
		const numericString = formattedValue.replace(/[^\d.,-]/g, '').replace(',', '.')
		return parseFloat(numericString)
	}

	// Fetch data et initialisation
	useEffect(() => {
		if (location.state && location.state.rowData) {
			const rowData = location.state.rowData

			console.log('rowData de la ligne cliquée :', rowData)

			const montantBrut = extractNumericValue(rowData[6]) // Extraire la valeur brute
			const montantFormate = keepTwoDecimals(montantBrut) // Formater correctement

			const extractedDetails = {
				code: rowData[0],
				echeance: rowData[1],
				ordo: rowData[2],
				fournisseur: rowData[3],
				libelle: rowData[4],
				destinataire: rowData[5],
				montant: montantFormate,
				nom_fichier: '2023_10\\20231009_15_43_24.pdf', // Ajout temporaire
			}

			setDetails(extractedDetails)
			setPrevisionCode(rowData[0])
			setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${extractedDetails.nom_fichier}`)
		}
	}, [location.state])

	// Ajoutez ici la logique qui utilise `userCredentials` pour récupérer des données supplémentaires
	useEffect(() => {
		if (!userCredentials) {
			console.error('Les userCredentials sont manquants.')
			return
		}

		console.log('User credentials disponibles :', userCredentials)

		// Exemple d'appel à un service avec les credentials
		// fetchPrevisionDetails(userCredentials, previsionCode).then((data) => {
		//   console.log("Données reçues :", data)
		// })
	}, [userCredentials, previsionCode])

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
								<strong>Date échéance :</strong> {details.echeance}
							</p>
							<p>
								<strong>Date ordo. :</strong> {details.ordo}
							</p>
							<p>
								<strong>Fournisseur :</strong> {details.fournisseur}
							</p>
							<p>
								<strong>Destinataire :</strong> {details.destinataire}
							</p>
							<p>
								<strong>Libellé :</strong> {details.libelle}
							</p>
							<p>
								<strong>Montant :</strong> {details.montant}
							</p>
							<p>
								<strong>Nom fichier :</strong> {details.nom_fichier}
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
