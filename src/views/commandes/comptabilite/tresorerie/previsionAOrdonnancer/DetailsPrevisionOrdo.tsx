import './previsionAOrdonnancer.scss'

// hooks | libraries
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, ReactElement, useContext } from 'react'
import { keepTwoDecimals, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'

// components
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'

// context
import { UserContext } from '../../../../../context/userContext.tsx'

// services
import { getPrevisionDetailsService } from '../../../../../API/services/Prevision.service.ts'

// types
import { IPrevision } from '../../../../../utils/types/prevision.interface'

interface ILocationState {
	state: {
		rowData: string[]
	}
}

const DetailsPrevisionOrdo = (): ReactElement => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState

	const { userCredentials } = useContext(UserContext)

	const [courrier, setCourrier] = useState<string | null>(null)
	const [details, setDetails] = useState<IPrevision | null>(null)
	const [previsionCode, setPrevisionCode] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(true)

	// Debugging useEffect to log changes to details
	useEffect(() => {
		console.log('Changement détecté dans details :', details)
	}, [details])

	// Extract prevision code from location
	useEffect(() => {
		const rowData = location?.state?.rowData
		console.log('Extraction de rowData :', rowData)

		if (rowData) {
			setPrevisionCode(rowData[0])
		} else {
			console.error('Aucune donnée de ligne trouvée dans location.state.rowData.')
		}
	}, [location?.state?.rowData])

	// Load prevision details
	useEffect(() => {
		const loadPrevisionDetails = async (): Promise<void> => {
			if (!userCredentials || !previsionCode) {
				console.error('Les userCredentials ou la clé de la prévision sont manquants.')
				setLoading(false)
				return
			}

			try {
				const response = await getPrevisionDetailsService(userCredentials, previsionCode)

				if (!response || typeof response === 'string') {
					console.error('Erreur lors de la récupération des détails :', response)
					setDetails(null)
					setCourrier(null)
					setLoading(false)
					return
				}

				const { prevision, courrier } = response
				console.log("Réponse brute de l'API :", response)
				console.log('Champs bruts de la prévision :', prevision)

				// Formater les données (similaire à PrevisionAOrdonnancer.tsx)
				const formattedDetails = {
					cle: prevision.cle || 'Non défini',
					datePiece: prevision.datePiece ? convertENDateToFr(prevision.datePiece) : 'Non défini',
					dateSaisie: prevision.dateSaisie ? convertENDateToFr(prevision.dateSaisie) : 'Non défini',
					societe: prevision.societe || 'Non défini',
					tiers: prevision.libelleCompteTiers || 'Non défini',
					rubrique: prevision.rubriqueTreso || 'Non défini',
					libelle: prevision.libelleEcriture || 'Non défini',
					dateEcheance: prevision.date_echeance ? convertENDateToFr(prevision.date_echeance) : '',
					dateOrdo: prevision.date_ordo ? convertENDateToFr(prevision.date_ordo) : '',
					banque_reglement: prevision.no_compte_banque || '',
					mode_reglement: prevision.modeReglement || '',
					montant: prevision.credit ? keepTwoDecimals(Number(prevision.credit)) : '',
					statut: prevision.statut || 'Non défini',
				}
				console.log('Details formatés :', formattedDetails)
				console.log('Montant formaté :', keepTwoDecimals(Number(prevision.credit)))
				console.log('Date avant conversion (échéance) :', prevision.date_echeance)
				console.log('Date après conversion (échéance) :', convertENDateToFr(prevision.date_echeance))
				console.log('Date brute (échéance) :', prevision.date_echeance)
				setDetails(formattedDetails)

				if (courrier?.nom_fichier) {
					setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${courrier.nom_fichier.replace(/\\/g, '/')}`)
				} else {
					setCourrier(null)
				}
			} catch (error) {
				console.error('Erreur lors de la récupération des données :', error)
				alert('Une erreur est survenue lors de la récupération des données.')
			} finally {
				setLoading(false)
			}
		}

		if (previsionCode) {
			console.log('Chargement des détails en cours...')
			loadPrevisionDetails()
		}
	}, [previsionCode, userCredentials])

	// Gestion des données manquantes
	if (!details) {
		return <p>Aucune prévision disponible pour la clé sélectionnée.</p>
	}

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
							<div>
								<p>Aucun courrier associé</p>
							</div>
						)}
					</div>

					{/* Right side: Details and actions */}
					<div className='rightSide'>
						<h3>
							Prévision {details.cle}{' '}
							{courrier === null && (
								<Button
									props={{
										style: 'blue',
										text: 'Associer un courrier',
										type: 'button',
										onClick: () => alert('Fonction à définir'),
									}}
								/>
							)}
						</h3>
						<div className='detailsWrapper'>
							<div>
								<strong>Date saisie :</strong>
								{details.datePiece || 'Non défini'}
							</div>
							<div>
								<strong>Société :</strong> {details.societe || 'Non défini'}
							</div>
							<div>
								<strong>Tiers :</strong>{' '}
								<Button
									props={{
										style: 'blue',
										text: 'Modif',
										type: 'button',
										onClick: () => alert('Modifier le tiers'),
									}}
								/>{' '}
								{details.tiers || 'Non défini'}
							</div>
							<div>
								<strong>Rubrique :</strong> {details.rubrique || 'Non défini'}
							</div>
							<div>
								<strong>Libellé :</strong> {details.libelle || 'Non défini'}
							</div>
							<div>
								<strong>Date échéance :</strong>{' '}
								<input
									type='date'
									value={details.echeance || ''}
									onChange={(e) => setDetails({ ...details, echeance: e.target.value })}
								/>
							</div>
							<div>
								<strong>Date ordo. :</strong>{' '}
								<input
									type='date'
									value={details.ordo || ''}
									onChange={(e) => setDetails({ ...details, ordo: e.target.value })}
								/>
							</div>
							<div>
								<strong>Banq. règlement :</strong>{' '}
								<select
									value={details.banque_reglement || ''}
									onChange={(e) => setDetails({ ...details, banque_reglement: e.target.value })}
								>
									<option value='000257117126 - SOCIETE GENERALE'>000257117126 - SOCIETE GENERALE</option>
									<option value='000257117127 - BNP PARIBAS'>000257117127 - BNP PARIBAS</option>
								</select>
							</div>
							<div>
								<strong>Mode règlement :</strong>
								<div className='modeReglement'>
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
							</div>
							<div>
								<strong>Montant :</strong>{' '}
								<input
									type='number'
									value={Number(details.montant).toFixed(2)}
									onChange={(e) => setDetails({ ...details, montant: e.target.value })}
								/>
							</div>
							<div>
								<strong>Statut :</strong>{' '}
								<select
									value={details.statut || ''}
									onChange={(e) => setDetails({ ...details, statut: e.target.value })}
								>
									<option value='Enregistrer (reste au même stade)'>Enregistrer (reste au même stade)</option>
									<option value='Prévision ordonnancée'>Prévision ordonnancée</option>
									<option value='Prévision rejetée'>Prévision rejetée</option>
									<option value='Litige'>Litige</option>
								</select>
							</div>
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
							<Button props={{ style: 'grey', text: 'Annuler', type: 'button', onClick: () => navigate(-1) }} />
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default DetailsPrevisionOrdo
