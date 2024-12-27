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

// services
import { getPrevisionDetailsService } from '../../../../../API/services/Prevision.service.ts'

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

	// Fonction pour charger les détails de la prévision
	const loadPrevisionDetails = async (): Promise<void> => {
		if (!userCredentials || !previsionCode) {
			console.error('Les userCredentials ou la clé de la prévision sont manquants.')
			return
		}

		try {
			const data = await getPrevisionDetailsService(userCredentials, previsionCode)

			if (typeof data === 'string') {
				console.error('Erreur lors de la récupération des détails :', data)
				alert(data) // Afficher l'erreur à l'utilisateur
				return
			}

			console.log('Données reçues :', data)

			const montantFormate = keepTwoDecimals(Number(data.credit))

			setDetails({
				code: data.cle,
				echeance: data.dateEcheance,
				ordo: data.dateOrdo,
				fournisseur: data.libelleCompteTiers,
				libelle: data.libelleEcriture,
				destinataire: data.societe,
				montant: montantFormate,
				nom_fichier: data.nomFichier || 'Aucun fichier disponible',
			})

			setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${data.nomFichier}`)
		} catch (error) {
			console.error("Erreur lors de l'appel à la procédure stockée :", error)
			alert("Une erreur s'est produite lors de la récupération des données. Veuillez réessayer.")
		}
	}

	// Effect pour charger les données au montage du composant
	useEffect(() => {
		if (location.state && location.state.rowData) {
			const rowData = location.state.rowData
			setPrevisionCode(rowData[0]) // Clé de la prévision (ex. "23056")
		}
	}, [location.state])

	// Effect pour charger les détails une fois la clé de la prévision définie
	useEffect(() => {
		if (previsionCode) {
			loadPrevisionDetails()
		}
	}, [previsionCode])

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
