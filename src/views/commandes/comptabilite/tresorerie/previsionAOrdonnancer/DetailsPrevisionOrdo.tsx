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
import { IPrevision } from '../../../../../utils/types/prevision.interface'
import { ICourrier } from '../../../../../utils/types/courrier.interface'

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

	const [courrier, setCourrier] = useState<ICourrier | null>(null)
	const [details, setDetails] = useState<IPrevision | null>(null)
	const [previsionCode, setPrevisionCode] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(true)

	// Effect pour charger la clé de la prévision depuis la ligne cliquée
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
				setLoading(false)
				return
			}

			try {
				const response = await getPrevisionDetailsService(userCredentials, previsionCode)

				if (typeof response === 'string') {
					console.error('Erreur lors de la récupération des détails :', response)
					setLoading(false)
					return
				}

				// Vérifiez et extrayez correctement les données
				const prevision = response.prevision
				const courrier = response.courrier?.courrier ?? response.data?.data?.courrier?.courrier

				const montantFormate = keepTwoDecimals(Number(prevision.commentaire?.split(' ')[0]?.replace(',', '.')) || 0)

				const detailsData = {
					code: prevision.cle,
					societe: prevision.societe,
					journal: prevision.code_journal,
					date_piece: prevision.date_piece,
					date_saisie: prevision.date_saisie,
					tiers: prevision.libelle_compte_tiers,
					rubrique: prevision.rubrique_treso,
					libelle: prevision.libelle_ecriture,
					echeance: prevision.date_echeance,
					ordo: prevision.date_ordo,
					banque_reglement: prevision.no_compte_tiers ?? 'Non défini',
					mode_reglement: prevision.mode_reglement,
					montant: montantFormate,
					statut: prevision.statut,
					courrier_nom_fichier: courrier?.nom_fichier ?? 'Non défini',
					courrier_nature: courrier?.nature,
					courrier_action: courrier?.action ?? 'Non défini',
					commentaire: courrier?.commentaire,
				}

				setDetails(detailsData)

				if (courrier?.nom_fichier) {
					setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${courrier.nom_fichier.replace(/\\/g, '/')}`)
				} else {
					console.error('Le fichier courrier.nom_fichier est introuvable ou non défini :', courrier)
					setCourrier(null)
				}
			} catch (error) {
				console.error("Erreur lors de l'appel à la procédure stockée :", error)
				alert("Une erreur s'est produite lors de la récupération des données. Veuillez réessayer.")
			} finally {
				setLoading(false)
			}
		}

		if (previsionCode) loadPrevisionDetails()
	}, [previsionCode, userCredentials])

	if (loading) {
		return <p>Chargement des détails...</p>
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
							{/* Toutes les balises <div> qui étaient imbriquées dans des <p> ont été corrigées */}
							<div>
								<strong>Date saisie :</strong> {details.date_saisie}
							</div>
							<div>
								<strong>Société :</strong> {details.societe}
							</div>
							<div>
								<strong>Tiers :</strong>{' '}
								<Button
									props={{ style: 'blue', text: 'Modif', type: 'button', onClick: () => alert('Modifier le tiers') }}
								/>{' '}
								{details.tiers}
							</div>
							<div>
								<strong>Rubrique :</strong> {details.rubrique}
							</div>
							<div>
								<strong>Libellé :</strong> {details.libelle}
							</div>
							<div>
								<strong>Date échéance :</strong>{' '}
								<input
									type='date'
									value={details.echeance as string}
									onChange={(e) => setDetails({ ...details, echeance: e.target.value })}
								/>
							</div>
							<div>
								<strong>Date ordo. :</strong>{' '}
								<input
									type='date'
									value={details.ordo as string}
									onChange={(e) => setDetails({ ...details, ordo: e.target.value })}
								/>
							</div>
							<div>
								<strong>Banq. règlement :</strong>{' '}
								<select
									value={details.banque_reglement as string}
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
									value={details.statut as string}
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
								props={{ style: 'blue', text: 'Ok', type: 'button', onClick: () => alert('Prévision validée') }}
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
