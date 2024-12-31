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

	// Extract prevision code from location
	useEffect(() => {
		const rowData = location?.state?.rowData
		if (rowData) {
			setPrevisionCode(rowData[0])
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

				if (typeof response === 'string') {
					console.error('Erreur lors de la récupération des détails :', response)
					setDetails(null)
					setCourrier(null)
					setLoading(false)
					return
				}

				const { prevision, courrier } = response

				// Formater le montant
				const montantFormate = keepTwoDecimals(Number(prevision.commentaire?.split(' ')[0]?.replace(',', '.')) || 0)

				// Mettre à jour l'état
				setDetails({
					...prevision,
					montant: montantFormate,
				})

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

		if (previsionCode) loadPrevisionDetails()
	}, [previsionCode, userCredentials])

	// Gestion du chargement
	if (loading) {
		return <p>Chargement des détails...</p>
	}

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
							Prévision {details.code}{' '}
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
								<strong>Date saisie :</strong> {details.date_saisie || 'Non défini'}
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
