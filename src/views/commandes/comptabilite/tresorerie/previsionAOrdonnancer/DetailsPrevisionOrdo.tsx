// import './previsionAOrdonnancer.scss'

// // hooks | libraries
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useEffect, useState, ReactElement, useContext, useCallback } from 'react'
// import { keepTwoDecimals } from '../../../../../utils/scripts/utils.ts'

// // components
// import Header from '../../../../../components/header/Header'
// import Button from '../../../../../components/button/Button.tsx'
// import Footer from '../../../../../components/footer/Footer'

// // context
// import { UserContext } from '../../../../../context/userContext.tsx'

// // services
// import { getPrevisionDetailsService } from '../../../../../API/services/Prevision.service.ts'

// // types
// interface ILocationState {
// 	state: {
// 		rowData: string[]
// 	}
// }

// const DetailsPrevisionOrdo = (): ReactElement => {
// 	const navigate = useNavigate()
// 	const location = useLocation() as ILocationState

// 	// Récupérer les userCredentials depuis le UserContext
// 	const { userCredentials } = useContext(UserContext)

// 	const [courrier, setCourrier] = useState<string | null>(null)
// 	const [details, setDetails] = useState<Record<string, string | number>>({})
// 	const [previsionCode, setPrevisionCode] = useState<string>('')

// 	// Fonction pour charger les détails de la prévision avec useCallback
// 	const loadPrevisionDetails = useCallback(async (): Promise<void> => {
// 		if (!userCredentials || !previsionCode) {
// 			console.error('Les userCredentials ou la clé de la prévision sont manquants.')
// 			return
// 		}

// 		try {
// 			const data = await getPrevisionDetailsService(userCredentials, previsionCode)

// 			if (typeof data === 'string') {
// 				console.error('Erreur lors de la récupération des détails :', data)
// 				return
// 			}

// 			console.log('Données reçues :', data)

// 			const montantFormate = keepTwoDecimals(Number(data.credit))

// 			setDetails({
// 				code: data.cle,
// 				echeance: data.dateEcheance,
// 				ordo: data.dateOrdo,
// 				fournisseur: data.libelleCompteTiers,
// 				libelle: data.libelleEcriture,
// 				destinataire: data.societe,
// 				montant: montantFormate,
// 				nom_fichier: data.nomFichier ?? 'Aucun fichier disponible',
// 			})

// 			setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${data.nomFichier}`)
// 		} catch (error) {
// 			console.error("Erreur lors de l'appel à la procédure stockée :", error)
// 			alert("Une erreur s'est produite lors de la récupération des données. Veuillez réessayer.")
// 		}
// 	}, [userCredentials, previsionCode])

// 	// Effect pour charger la clé de prévision à partir de la ligne cliquée
// 	useEffect(() => {
// 		const rowData = location?.state?.rowData
// 		if (rowData) {
// 			setPrevisionCode(rowData[0]) // Clé de la prévision (ex. "23056")
// 		}
// 	}, [location?.state?.rowData])

// 	// Effect pour charger les détails une fois la clé de la prévision définie
// 	useEffect(() => {
// 		if (previsionCode) {
// 			loadPrevisionDetails()
// 		}
// 	}, [previsionCode, loadPrevisionDetails])

// 	return (
// 		<>
// 			<Header
// 				props={{
// 					pageURL: `GIVOO | TRÉSORERIE | DÉTAILS PRÉVISION ORDONNANCER ${previsionCode}`,
// 				}}
// 			/>
// 			<main id='detailsPrevisionOrdo'>
// 				<div className='detailsContainer'>
// 					{/* Left side: Courrier display */}
// 					<div className='leftSide'>
// 						{courrier ? (
// 							<iframe src={courrier} title='Courrier associé' className='courrierDisplay' />
// 						) : (
// 							<p>Aucun courrier associé</p>
// 						)}
// 					</div>

// 					{/* Right side: Details and actions */}
// 					<div className='rightSide'>
// 						<h3>Prévision {details.code}</h3>
// 						<div className='detailsWrapper'>
// 							<p>
// 								<strong>Date échéance :</strong> {details.echeance}
// 							</p>
// 							<p>
// 								<strong>Date ordo. :</strong> {details.ordo}
// 							</p>
// 							<p>
// 								<strong>Fournisseur :</strong> {details.fournisseur}
// 							</p>
// 							<p>
// 								<strong>Destinataire :</strong> {details.destinataire}
// 							</p>
// 							<p>
// 								<strong>Libellé :</strong> {details.libelle}
// 							</p>
// 							<p>
// 								<strong>Montant :</strong> {details.montant}
// 							</p>
// 							<p>
// 								<strong>Nom fichier :</strong> {details.nom_fichier}
// 							</p>
// 						</div>
// 						<div className='buttonWrapper'>
// 							<Button
// 								props={{
// 									style: 'blue',
// 									text: 'Ok',
// 									type: 'button',
// 									onClick: () => alert('Prévision validée'),
// 								}}
// 							/>
// 							<Button
// 								props={{
// 									style: 'grey',
// 									text: 'Annuler',
// 									type: 'button',
// 									onClick: () => navigate(-1),
// 								}}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</main>
// 			<Footer />
// 		</>
// 	)
// }

// export default DetailsPrevisionOrdo

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

	// Effect pour charger les données au montage du composant
	useEffect(() => {
		const rowData = location?.state?.rowData
		if (rowData) {
			setPrevisionCode(rowData[0]) // Clé de la prévision
		}
	}, [location?.state?.rowData])

	// Charger les détails de la prévision
	useEffect(() => {
		const loadPrevisionDetails = async (): Promise<void> => {
			if (!userCredentials || !previsionCode) {
				console.error('Les userCredentials ou la clé de la prévision sont manquants.')
				return
			}

			try {
				const data = await getPrevisionDetailsService(userCredentials, previsionCode)

				if (typeof data === 'string') {
					console.error('Erreur lors de la récupération des détails :', data)
					return
				}

				const montantFormate = keepTwoDecimals(Number(data.credit))

				setDetails({
					code: data.cle,
					date_saisie: data.dateSaisie,
					societe: data.societe,
					tiers: data.noCompteTiers,
					rubrique: data.rubriqueTreso,
					libelle: data.libelleEcriture,
					echeance: data.dateEcheance,
					ordo: data.dateOrdo,
					montant: montantFormate,
					banque_reglement: data.noCompteBanque,
					mode_reglement: data.modeReglement,
					statut: data.statut,
					nom_fichier: data.nomFichier ?? 'Aucun fichier disponible',
				})

				setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${data.nomFichier}`)
			} catch (error) {
				console.error("Erreur lors de l'appel à la procédure stockée :", error)
				alert("Une erreur s'est produite lors de la récupération des données. Veuillez réessayer.")
			}
		}

		if (previsionCode) loadPrevisionDetails()
	}, [previsionCode, userCredentials])

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
						<h3>
							Prévision {details.code}{' '}
							<Button
								props={{
									style: 'blue',
									text: 'Associer un courrier',
									type: 'button',
									onClick: () => alert('Fonction à définir'),
								}}
							/>
						</h3>
						<div className='detailsWrapper'>
							<p>
								<strong>Date saisie :</strong> {details.date_saisie}
							</p>
							<p>
								<strong>Société :</strong> {details.societe}
							</p>
							<p>
								<strong>Tiers :</strong>{' '}
								<Button
									props={{
										style: 'blue',
										text: 'Modif',
										type: 'button',
										onClick: () => alert('Modifier le tiers'),
									}}
								/>
								{details.tiers}
							</p>
							<p>
								<strong>Rubrique :</strong> {details.rubrique}
							</p>
							<p>
								<strong>Libellé :</strong> {details.libelle}
							</p>
							<p>
								<strong>Date échéance :</strong>{' '}
								<input
									type='date'
									value={details.echeance as string}
									onChange={(e) => setDetails({ ...details, echeance: e.target.value })}
								/>
							</p>
							<p>
								<strong>Date ordo. :</strong>{' '}
								<input
									type='date'
									value={details.ordo as string}
									onChange={(e) => setDetails({ ...details, ordo: e.target.value })}
								/>
							</p>
							<p>
								<strong>Banq. règlement :</strong>{' '}
								<select
									value={details.banque_reglement as string}
									onChange={(e) => setDetails({ ...details, banque_reglement: e.target.value })}
								>
									<option value='000257117126 - SOCIETE GENERALE'>000257117126 - SOCIETE GENERALE</option>
									<option value='000257117127 - BNP PARIBAS'>000257117127 - BNP PARIBAS</option>
								</select>
							</p>
							<p>
								<strong>Mode règlement :</strong>{' '}
								<div>
									<Button
										props={{
											style: details.mode_reglement === 'PRELEV' ? 'blue' : 'grey',
											text: 'PRELEV',
											type: 'button',
											onClick: () => setDetails({ ...details, mode_reglement: 'PRELEV' }),
										}}
									/>
									<Button
										props={{
											style: details.mode_reglement === 'CHEQUE' ? 'blue' : 'grey',
											text: 'CHEQUE',
											type: 'button',
											onClick: () => setDetails({ ...details, mode_reglement: 'CHEQUE' }),
										}}
									/>
									<Button
										props={{
											style: details.mode_reglement === 'VIR' ? 'blue' : 'grey',
											text: 'VIR',
											type: 'button',
											onClick: () => setDetails({ ...details, mode_reglement: 'VIR' }),
										}}
									/>
								</div>
							</p>
							<p>
								<strong>Montant :</strong>{' '}
								<input
									type='number'
									value={Number(details.montant).toFixed(2)}
									onChange={(e) => setDetails({ ...details, montant: e.target.value })}
								/>
							</p>
							<p>
								<strong>Statut :</strong>{' '}
								<select
									value={details.statut as string}
									onChange={(e) => setDetails({ ...details, statut: e.target.value })}
								>
									<option value='Enregistrer (reste au même stade)'>Enregistrer (reste au même stade)</option>
									<option value='Prévision ordonnancée'>Prévision ordonnancée</option>
									<option value='Prévision rejetée'>Prévision rejetée</option>
									<option value='Litige'>Litige</option>
								</select>
							</p>
							<div className='buttonWrapper'>
								<Button
									props={{
										style: 'blue',
										text: 'Etalement',
										type: 'button',
										onClick: () => alert('Fonction à définir'),
									}}
								/>
								<Button
									props={{
										style: 'blue',
										text: 'Supprimer',
										type: 'button',
										onClick: () => alert('Fonction à définir'),
									}}
								/>
							</div>
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
