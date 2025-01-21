import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import ConfirmationModal from '../../../../../components/ConfirmationModal/ConfirmationModal.tsx'
import ModalCourriers from '../previsionAOrdonnancer/ModalCourriers.tsx'
import ModalTiers from './ModalTiers.tsx'
import AddTiersModal from './AddTiersModal.tsx'
import VisualisationPrevisionsTiers from '../previsionAOrdonnancer/VisualisationPrevisionsTiers.tsx'
import { keepTwoDecimals, convertENDateToFr, formatDateToHtml } from '../../../../../utils/scripts/utils.ts'
import '../previsionAOrdonnancer/previsionAOrdonnancer.scss'

interface ILocationState {
	state: {
		fullRowDetails: {
			cle: string
			societe: string
			dateSaisie: string
			dateEcheance: string
			libelleCompteTiers: string
			libelleEcriture: string
			libelleEcritureAnnee: string
			libelleEcritureMois: string
			libelleEcriturePrefixe: string
			libelleEcritureTrimestre: string
			libelleEcritureBeneficiaire: string
			credit: string
			debit: string
			rubriqueTreso: string
			nomFichier?: string
			dateOrdo: string
			no_compte_banque: string
			banqueReglement: string
			modeReglement: string
			statut: string
			refSourceTiers: string
		}
	}
}

interface RowDetails {
	cle: string
	societe: string
	dateSaisie: string
	dateEcheance: string
	libelleCompteTiers: string
	libelleEcriture: string
	libelleEcritureAnnee: string
	libelleEcritureMois: string
	libelleEcriturePrefixe: string
	libelleEcritureTrimestre: string
	libelleEcritureBeneficiaire: string
	credit: string
	debit: string
	rubriqueTreso: string
	nomFichier?: string
	dateOrdo: string
	no_compte_banque: string
	banqueReglement: string
	modeReglement: string
	statut: string
	refSourceTiers: string
}

const DetailsPrevisionValider: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState

	const [courrier, setCourrier] = useState<string | null>(null)
	const [isPdfLoaded, setIsPdfLoaded] = useState<boolean>(true)
	const [details, setDetails] = useState<RowDetails | null>(null)
	const [modePaiement, setModePaiement] = useState<string>('')
	const [modalStates, setModalStates] = useState({
		isModalOpen: false,
		isPrevisionsModalOpen: false,
		showModal: false,
		isTiersModalOpen: false,
		isAddTiersModalOpen: false,
	})

	// Mocked data for "Rubrique" and "Libellé" fields
	const [rubriques, setRubriques] = useState<{ cle: string; libelle: string }[]>([])
	const [prefixes, setPrefixes] = useState<string[]>([])
	const [mois, setMois] = useState<string[]>([])
	const [annees, setAnnees] = useState<string[]>([])

	useEffect(() => {
		const rowData = location?.state?.fullRowDetails
		if (rowData) {
			const formattedDetails: RowDetails = {
				cle: rowData.cle || 'Non défini',
				dateSaisie: rowData.dateSaisie ? convertENDateToFr(rowData.dateSaisie) : 'Non défini',
				societe: rowData.societe || 'Non défini',
				libelleCompteTiers: rowData.libelleCompteTiers || 'Non défini',
				rubriqueTreso: rowData.rubriqueTreso || 'Non défini',
				libelleEcriture: rowData.libelleEcriture || 'Non défini',
				libelleEcritureAnnee: '',
				libelleEcritureMois: '',
				libelleEcriturePrefixe: '',
				libelleEcritureTrimestre: rowData.libelleEcritureTrimestre || '',
				libelleEcritureBeneficiaire: rowData.libelleEcritureBeneficiaire || '',
				dateEcheance: rowData.dateEcheance ? formatDateToHtml(rowData.dateEcheance) : '',
				dateOrdo: rowData.dateOrdo ? formatDateToHtml(rowData.dateOrdo) : '',
				no_compte_banque: rowData.no_compte_banque || '',
				banqueReglement: rowData.banqueReglement || '',
				modeReglement: rowData.modeReglement || '',
				credit: rowData.credit ? keepTwoDecimals(Number(rowData.credit)) : '0.00',
				debit: rowData.debit ? keepTwoDecimals(Number(rowData.debit)) : '0.00',
				statut: rowData.statut || 'A VALIDER',
				refSourceTiers: rowData.refSourceTiers || 'Non défini',
				nomFichier: rowData.nomFichier ?? 'Non défini',
			}
			setDetails(formattedDetails)
			setModePaiement(rowData.modeReglement || '')

			if (rowData?.nomFichier) {
				const pdfUrl = `http://192.168.0.254:8080/usv_prod/courriers/${rowData.nomFichier.replace(/\\/g, '/')}`
				setCourrier(pdfUrl)
				setIsPdfLoaded(true) // Reset the state when a new PDF is set
			} else {
				setCourrier(null)
			}

			// Mocked data for "Rubrique" and "Libellé" fields
			setRubriques([
				{ cle: '1', libelle: 'Rubrique 1' },
				{ cle: '2', libelle: 'Rubrique 2' },
			])
			setPrefixes(['Prefixe 1', 'Prefixe 2'])
			setMois(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
			setAnnees(['2023', '2024', '2025'])
		} else {
			console.error('Aucune donnée de ligne trouvée dans location.state.fullRowDetails.')
		}
	}, [location?.state?.fullRowDetails])

	const handleSave = (updatedDetails: RowDetails) => {
		alert('Fonctionnalité de sauvegarde non implémentée pour le moment.')
	}

	const handleConfirm = () => {
		setModalStates((prev) => ({ ...prev, showModal: false }))
		alert('Fonctionnalité d’étalement non implémentée pour le moment.')
	}

	const handleCancel = () => {
		setModalStates((prev) => ({ ...prev, showModal: false }))
	}

	const handleCheque = () => {
		if (modePaiement === 'CHEQUE') {
			if (details) {
				setModePaiement(details.modeReglement)
			}
		} else {
			setModePaiement('CHEQUE')
		}
	}

	const handleSelectTiers = (tiers: { code: string; intitule: string; rubrique: string }) => {
		if (details) {
			setDetails({
				...details,
				libelleCompteTiers: tiers.intitule,
			})
		}
	}

	useEffect(() => {
		if (details?.libelleCompteTiers && modalStates.isTiersModalOpen) {
			toggleModal('isTiersModalOpen')
		}
	}, [details?.libelleCompteTiers])

	const toggleModal = (modalName: keyof typeof modalStates) => {
		setModalStates((prev) => {
			const newState = { ...prev, [modalName]: !prev[modalName] }
			if (newState[modalName]) {
				document.body.classList.add('no-scroll')
			} else {
				document.body.classList.remove('no-scroll')
			}
			return newState
		})
	}
	
	useEffect(() => {
		setModalStates({
			isModalOpen: false,
			isPrevisionsModalOpen: false,
			showModal: false,
			isTiersModalOpen: false,
			isAddTiersModalOpen: false,
		})
	}, [])

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
							<>
								<iframe
									src={courrier}
									title='Courrier associé'
									className='courrierDisplay'
									onError={() => setIsPdfLoaded(false)} // Handle PDF loading errors
								/>
								{!isPdfLoaded && (
									<div>
										<p>Aucun courrier associé</p>
									</div>
								)}
							</>
						) : (
							<div>
								<p>Aucun courrier associé</p>
							</div>
						)}
					</div>

					<div className='rightSide'>
						<h3>
							<div
								className={courrier?.toLowerCase().includes('pdf') ? 'prevCourButtonHidden' : 'prevCourButtonActive'}
							>
								<Button
									props={{
										style: 'blue',
										text: 'Associer un courrier',
										type: 'button',
										onClick: () => toggleModal('isModalOpen'),
									}}
								/>
							</div>
							Prévision {details.cle}{' '}
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
									<strong>Tiers : </strong> {details.libelleCompteTiers || 'Non défini'}
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
											text: 'Rechercher Tiers',
											type: 'button',
											onClick: () => toggleModal('isTiersModalOpen'),
										}}
									/>
									<Button
										props={{
											style: 'blue',
											text: 'Créer Tiers',
											type: 'button',
											onClick: () => toggleModal('isAddTiersModalOpen'),
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
							{modalStates.isTiersModalOpen && (
								<ModalTiers
									isOpen={modalStates.isTiersModalOpen}
									onClose={() => toggleModal('isTiersModalOpen')}
									onSelectTiers={handleSelectTiers}
								/>
							)}
							{modalStates.isAddTiersModalOpen && <AddTiersModal onClose={() => toggleModal('isAddTiersModalOpen')} />}
							<div>
								<strong>Rubrique :</strong>{' '}
								<select
									value={details.rubriqueTreso || ''}
									onChange={(e) => setDetails({ ...details, rubriqueTreso: e.target.value })}
								>
									<option value=''>Choisir</option>
									{rubriques.map((rubrique) => (
										<option key={rubrique.cle} value={rubrique.cle}>
											{rubrique.libelle}
										</option>
									))}
								</select>
							</div>
							<div className='libelleWrapper'>
								<div className='libelleTitle'>
									<strong>Libellé :</strong>
								</div>
								<div className='ValidLibelleWrapper'>
									<select
										value={details.libelleEcriturePrefixe || ''}
										onChange={(e) => setDetails({ ...details, libelleEcriturePrefixe: e.target.value })}
									>
										<option value=''>Préfixe</option>
										{prefixes.map((prefixe) => (
											<option key={prefixe} value={prefixe}>
												{prefixe}
											</option>
										))}
									</select>
									<select
										value={details.libelleEcritureMois || ''}
										onChange={(e) => setDetails({ ...details, libelleEcritureMois: e.target.value })}
									>
										<option value=''>Mois</option>
										{mois.map((mois) => (
											<option key={mois} value={mois}>
												{mois}
											</option>
										))}
									</select>
									<select
										value={details.libelleEcritureAnnee || ''}
										onChange={(e) => setDetails({ ...details, libelleEcritureAnnee: e.target.value })}
									>
										<option value=''>Année</option>
										{annees.map((annee) => (
											<option key={annee} value={annee}>
												{annee}
											</option>
										))}
									</select>
									<input
										type='text'
										placeholder='Trim'
										value={details.libelleEcritureTrimestre || ''}
										onChange={(e) => setDetails({ ...details, libelleEcritureTrimestre: e.target.value })}
									/>
									<input
										type='text'
										placeholder='Bénéficiaire'
										value={details.libelleEcritureBeneficiaire || ''}
										onChange={(e) => setDetails({ ...details, libelleEcritureBeneficiaire: e.target.value })}
									/>
								</div>
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
								<select value={''} onChange={(e) => setDetails({ ...details, banqueReglement: e.target.value })}>
									<option value='000257117126 - SOCIETE GENERALE'>000257117126 - SOCIETE GENERALE</option>
									<option value='000257117127 - BNP PARIBAS'>000257117127 - BNP PARIBAS</option>
								</select>
							</div>
							<div>
								<strong>Mode règlement :</strong>
								<div className='modeReglement'>
									<Button
										props={{
											style: modePaiement === 'PRELEV' ? 'blue' : 'grey',
											text: 'PRELEV',
											type: 'button',
											onClick: () => setModePaiement('PRELEV'),
										}}
									/>
									<Button
										props={{
											style: modePaiement === 'CHEQUE' ? 'blue' : 'grey',
											text: 'CHEQUE',
											type: 'button',
											onClick: handleCheque,
										}}
									/>
									<Button
										props={{
											style: modePaiement === 'VIR' ? 'blue' : 'grey',
											text: 'VIR',
											type: 'button',
											onClick: () => setModePaiement('VIR'),
										}}
									/>
								</div>
							</div>
							<div>
								<strong>Montant en € :</strong>{' '}
								<input
									type='number'
									value={
										details.credit
											? parseFloat(details.credit.replace(/\s/g, '').replace(',', '.'))
											: parseFloat(details.debit.replace(/\s/g, '').replace(',', '.'))
									}
									step='0.01'
									onChange={(e) => setDetails({ ...details, credit: e.target.value })}
									onBlur={() => handleSave(details)}
								/>
							</div>
							<div>
								<strong>Statut :</strong>{' '}
								<select
									value={details.statut || 'A VALIDER'}
									onChange={(e) => setDetails({ ...details, statut: e.target.value })}
								>
									<option value='A VALIDER'>Mise en paiement à valider</option>
									<option value='VALIDE'>Mise en paiement validée</option>
									<option value='REJETE'>Paiement rejeté</option>
									<option value='LITIGE'>Litige</option>
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
									text: 'Ok',
									type: 'button',
									onClick: () => alert('Prévision validée'),
								}}
							/>
							<Button
								props={{
									style: 'blue',
									text: 'Ok + Duplication',
									type: 'button',
									onClick: () =>
										navigate(`/commandes/tresorerie/dupliquer_details_prevision_valider/`, {
											state: { fullRowDetails: details },
										}),
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
