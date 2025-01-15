import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import ConfirmationModal from '../../../../../components/ConfirmationModal/ConfirmationModal.tsx'
import ModalCourriers from '../previsionAOrdonnancer/ModalCourriers.tsx'
import VisualisationPrevisionsTiers from '../previsionAOrdonnancer/VisualisationPrevisionsTiers.tsx'
import { keepTwoDecimals, convertENDateToFr, formatDateToHtml } from '../../../../../utils/scripts/utils.ts'
import './previsionAValider.scss'

interface ILocationState {
	state: {
		fullRowDetails: {
			cle: string
			societe: string
			dateSaisie: string
			dateEcheance: string
			libelleCompteTiers: string
			libelleEcriture: string
			credit: string
			rubriqueTreso: string
			nomFichier?: string
			dateOrdo: string // New field
			no_compte_banque: string // New field
			modeReglement: string // New field
			statut: string // New field
			refSourceTiers: string // New field
		}
	}
}

interface Details {
	cle: string
	dateSaisie: string
	societe: string
	tiers: string
	rubrique: string
	libelle: string
	dateEcheance: string
	dateOrdo: string
	banque_reglement: string
	mode_reglement: string
	montant: string
	statut: string
	refSourceTiers: string
}

const DetailsPrevisionValider: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState

	const [courrier, setCourrier] = useState<string | null>(null)
	const [details, setDetails] = useState<Details | null>(null)
	const [modalStates, setModalStates] = useState({
		isModalOpen: false,
		isPrevisionsModalOpen: false,
		showModal: false,
	})

	const toggleModal = (modalName: keyof typeof modalStates) => {
		setModalStates((prev) => ({ ...prev, [modalName]: !prev[modalName] }))
	}

	useEffect(() => {
		const rowData = location?.state?.fullRowDetails
		if (rowData) {
			const formattedDetails = {
				cle: rowData.cle || 'Non défini',
				dateSaisie: rowData.dateSaisie ? convertENDateToFr(rowData.dateSaisie) : 'Non défini',
				societe: rowData.societe || 'Non défini',
				tiers: rowData.libelleCompteTiers || 'Non défini',
				rubrique: rowData.rubriqueTreso || 'Non défini',
				libelle: rowData.libelleEcriture || 'Non défini',
				dateEcheance: rowData.dateEcheance ? formatDateToHtml(rowData.dateEcheance) : '',
				dateOrdo: rowData.dateOrdo ? formatDateToHtml(rowData.dateOrdo) : '', // New field
				banque_reglement: rowData.no_compte_banque || '', // New field
				mode_reglement: rowData.modeReglement || '', // New field
				montant: rowData.credit ? keepTwoDecimals(Number(rowData.credit)) : '0.00',
				statut: rowData.statut || 'Non défini', // New field
				refSourceTiers: rowData.refSourceTiers || 'Non défini', // New field
			}

			setDetails(formattedDetails)

			if (rowData.nomFichier) {
				const encodedFilePath = encodeURIComponent(rowData.nomFichier.replace(/\\/g, '/'))
				setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${encodedFilePath}`)
			} else {
				setCourrier(null)
			}
		} else {
			console.error('Aucune donnée de ligne trouvée dans location.state.fullRowDetails.')
		}
	}, [location?.state?.fullRowDetails])

	// const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Details) => {
	// 	const newValue = e.target.value
	// 	if (newValue) {
	// 		setDetails((prevDetails) => ({
	// 			...prevDetails,
	// 			[field]: newValue,
	// 		}))
	// 	}
	// }

	const handleSave = (updatedDetails: Details) => {
		console.log('Données sauvegardées (mocked) :', updatedDetails)
		alert('Fonctionnalité de sauvegarde non implémentée pour le moment.')
	}

	const handleConfirm = () => {
		toggleModal('showModal')
		alert('Fonctionnalité d’étalement non implémentée pour le moment.')
	}

	const handleCancel = () => {
		toggleModal('showModal')
	}

	if (!details) {
		return <p>Aucune prévision disponible pour la clé sélectionnée.</p>
	}

	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | DÉTAILS PRÉVISION À VALIDER ${details.cle}` }} />
			<main id='detailsPrevisionOrdo'>
				<div className='detailsContainer'>
					<div className='leftSide'>
						{courrier ? (
							<iframe src={courrier} title='Courrier associé' className='courrierDisplay' />
						) : (
							<div className='no-courrier'>
								<p>Aucun courrier associé</p>
							</div>
						)}
					</div>

					<div className='rightSide'>
						<h3>
							Prévision {details.cle}{' '}
							{courrier === null && (
								<Button
									props={{
										style: 'blue',
										text: 'Associer un courrier',
										type: 'button',
										onClick: () => toggleModal('isModalOpen'),
									}}
								/>
							)}
						</h3>
						{modalStates.isModalOpen && (
							<ModalCourriers
								isOpen={modalStates.isModalOpen}
								onClose={() => toggleModal('isModalOpen')}
								userCredentials={null}
								previsionCode={details.cle}
							/>
						)}
						<div className='detailsWrapper'>
							<div>
								<strong>Date saisie :</strong> {details.dateSaisie || 'Non défini'}
							</div>
							<div>
								<strong>Société :</strong> {details.societe || 'Non défini'}
							</div>
							<div className='tiersWrapper'>
								<div>
									<strong>Tiers : </strong> {details.tiers || 'Non défini'}
								</div>
								<div className='buttonWrapper'>
									<Button
										props={{
											style: 'blue',
											text: 'Prévisions',
											type: 'button',
											onClick: () => toggleModal('isPrevisionsModalOpen'),
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
							{modalStates.isPrevisionsModalOpen && (
								<div className='modal'>
									<div className='modalContent'>
										<VisualisationPrevisionsTiers
											userCredentials={null}
											refSourceTiers={details.refSourceTiers}
											onClose={() => toggleModal('isPrevisionsModalOpen')}
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
									value={details.dateEcheance ?? ''}
									onChange={(e) => setDetails({ ...details, dateEcheance: e.target.value })}
									onBlur={() => handleSave(details)}
								/>
							</div>
							<div>
								<strong>Date ordo. :</strong>{' '}
								<input
									type='date'
									value={details.dateOrdo ?? ''}
									onChange={(e) => setDetails({ ...details, dateOrdo: e.target.value })}
									onBlur={() => handleSave(details)}
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
									value={details.montant ? parseFloat(details.montant.replace(/\s/g, '').replace(',', '.')) : 0}
									step='0.01'
									onChange={(e) => setDetails({ ...details, montant: e.target.value })}
									onBlur={() => handleSave(details)}
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
										onClick: () => toggleModal('showModal'),
									}}
								/>
								<Button
									props={{
										style: 'blue',
										text: 'Supprimer',
										type: 'button',
										onClick: () => alert('Prévision supprimée !'),
									}}
								/>
							</div>
						</div>
						{modalStates.showModal && (
							<ConfirmationModal
								message='Confirmez-vous l’étalement de cette prévision par la création d’un échéancier ?'
								onConfirm={handleConfirm}
								onCancel={handleCancel}
							/>
						)}
						<div className='buttonWrapper'>
							<Button
								props={{
									style: 'blue',
									text: 'Valider',
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

export default DetailsPrevisionValider
