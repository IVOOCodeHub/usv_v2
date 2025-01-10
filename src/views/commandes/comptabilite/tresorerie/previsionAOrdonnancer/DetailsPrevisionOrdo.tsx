import './previsionAOrdonnancer.scss'

// hooks | libraries
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, ReactElement, useContext } from 'react'
import {
	keepTwoDecimals,
	convertENDateToFr,
	formatDateToHtml,
	validateAndConvertDateForApi,
} from '../../../../../utils/scripts/utils.ts'

// components
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import ModalCourriers from './ModalCourriers.tsx'
import VisualisationPrevisionsTiers from './VisualisationPrevisionsTiers.tsx'

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
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isPrevisionsModalOpen, setIsPrevisionsModalOpen] = useState<boolean>(false)

	useEffect(() => {
		if (isPrevisionsModalOpen) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}

		// Nettoyage en cas de démontage
		return () => document.body.classList.remove('no-scroll')
	}, [isPrevisionsModalOpen])

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
					dateSaisie: prevision.dateSaisie ? convertENDateToFr(prevision.dateSaisie) : 'Non défini',
					societe: prevision.societe || 'Non défini',
					tiers: prevision.libelleCompteTiers ?? 'Non défini',
					rubrique: prevision.rubriqueTreso ?? 'Non défini',
					libelle: prevision.libelleEcriture ?? 'Non défini',
					dateEcheance: prevision.dateEcheance ? formatDateToHtml(prevision.dateEcheance) : '', // Convertit en YYYY-MM-DD
					dateOrdo: prevision.dateOrdo ? formatDateToHtml(prevision.dateOrdo) : '', // Convertit en YYYY-MM-DD
					banque_reglement: prevision.no_compte_banque ?? '',
					mode_reglement: prevision.modeReglement ?? '',
					montant:
						prevision.credit !== undefined && prevision.credit !== null
							? keepTwoDecimals(Number(prevision.credit))
							: '0.00',
					statut: prevision.statut ?? 'Non défini',
					refSourceTiers: prevision.refSourceTiers ?? 'Non défini',
				}

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

	const handleSave = (updatedDetails: IPrevision) => {
		const dataForApi = {
			...updatedDetails,
			dateSaisie: validateAndConvertDateForApi(updatedDetails.dateSaisie ?? ''),
			dateEcheance: validateAndConvertDateForApi(updatedDetails.dateEcheance ?? ''),
			dateOrdo: validateAndConvertDateForApi(updatedDetails.dateOrdo ?? ''),
		}

		console.log("Données prêtes pour l'API :", dataForApi)

		// Appel API ou traitement des données ici
		// await saveDetailsService(dataForApi);
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
										onClick: () => setIsModalOpen(true),
									}}
								/>
							)}
						</h3>
						{isModalOpen && userCredentials && (
							<ModalCourriers
								isOpen={isModalOpen}
								onClose={() => setIsModalOpen(false)}
								userCredentials={userCredentials}
								previsionCode={previsionCode}
							/>
						)}
						<div className='detailsWrapper'>
							<div>
								<strong>Date saisie :</strong>
								{details.dateSaisie || 'Non défini'}
							</div>
							<div>
								<strong>Société :</strong> {details.societe || 'Non défini'}
							</div>
							<div className='tiersWrapper'>
								<div>
									<strong>Tiers : </strong>
									{details.tiers || 'Non défini'}
								</div>
								<div className='buttonWrapper'>
									<Button
										props={{
											style: 'blue',
											text: 'Prévisions',
											type: 'button',
											onClick: () => setIsPrevisionsModalOpen(true),
										}}
									/>
									<Button
										props={{
											style: 'blue',
											text: 'Modifier',
											type: 'button',
											onClick: () =>
												navigate(`/commandes/tresorerie/modify-tiers/${details.refSourceTiers ?? details.tiers}`),
										}}
									/>
								</div>
							</div>
							{isPrevisionsModalOpen && userCredentials && (
								<div className='modal'>
									<div className='modalContent'>
										<VisualisationPrevisionsTiers
											userCredentials={userCredentials}
											refSourceTiers={details.refSourceTiers}
											onClose={() => setIsPrevisionsModalOpen(false)}
										/>
									</div>
								</div>
							)}
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
									value={details.dateEcheance ?? ''} // Affiche la date brute (YYYY-MM-DD) correctement
									onChange={(e) => {
										const newValue = e.target.value // Nouvelle valeur brute entrée par l'utilisateur
										setDetails({
											...details,
											dateEcheance: newValue, // Met à jour dans l'état
										})
									}}
									onBlur={(e) => {
										const updatedDate = e.target.value // Date après modification
										handleSave({ ...details, dateEcheance: updatedDate }) // Sauvegarde avec handleSave
									}}
								/>
							</div>
							<div>
								<strong>Date ordo. :</strong>{' '}
								<input
									type='date'
									value={details.dateOrdo ?? ''} // Affiche la date brute (YYYY-MM-DD) correctement
									onChange={(e) => {
										const newValue = e.target.value // Nouvelle valeur brute entrée par l'utilisateur
										setDetails({
											...details,
											dateOrdo: newValue, // Met à jour dans l'état
										})
									}}
									onBlur={(e) => {
										const updatedDate = e.target.value // Date après modification
										handleSave({ ...details, dateOrdo: updatedDate }) // Sauvegarde avec handleSave
									}}
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
								<strong>Montant en € :</strong>{' '}
								<input
									type='number'
									value={details.montant ? parseFloat(details.montant.replace(/\s/g, '').replace(',', '.')) : 0} // Conversion en nombre
									step='0.01'
									onChange={(e) => {
										const newValue = e.target.value // Nouvelle valeur saisie
										setDetails({ ...details, montant: newValue }) // Stocke la valeur brute
									}}
									onBlur={() => {
										if (details.montant) {
											// Formatte et sauvegarde après la modification
											const formattedMontant = keepTwoDecimals(
												Number(details.montant.replace(/\s/g, '').replace(',', '.'))
											)
											setDetails({ ...details, montant: formattedMontant.toString() })
										}
									}}
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
										text: 'Étalement',
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
