import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import ModalCourriers from '../previsionAOrdonnancer/ModalCourriers.tsx'
import ConfirmationModal from '../../../../../components/ConfirmationModal/ConfirmationModal.tsx'
import { keepTwoDecimals, convertENDateToFr } from '../../../../../utils/scripts/utils.ts'
import './encaissements.scss'

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
			noCompteBanque: string
			banqueReglement: string
			modeReglement: string
			statut: string
			refSourceTiers: string
			commentaire: string
			reference_paiement: string
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
	noCompteBanque: string
	banqueReglement: string
	modeReglement: string
	statut: string
	refSourceTiers: string
	commentaire: string
	reference_paiement: string
}

const DetailsEncaissement: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState
	const [courrier, setCourrier] = useState<string | null>(null)
	const [isPdfLoaded, setIsPdfLoaded] = useState<boolean>(true)
	const [details, setDetails] = useState<RowDetails | null>(null)
	const [modalStates, setModalStates] = useState({
		isModalOpen: false,
		isTiersModalOpen: false,
		showModal: false,
		isAddTiersModalOpen: false,
	})

	// Validate PDF link
	const validatePdfLink = (link: string | null): boolean => {
		if (!link) return false // If the link is null, it's invalid
		return link.toLowerCase().includes('.pdf') // Check if the link contains ".pdf"
	}

	// Load row details from location state
	useEffect(() => {
		const rowData = location?.state?.fullRowDetails
		if (rowData) {
			const formattedDetails: RowDetails = {
				cle: rowData.cle || 'Non défini',
				dateSaisie: rowData.dateSaisie ? convertENDateToFr(rowData.dateSaisie) : '',
				societe: rowData.societe || 'Non défini',
				dateEcheance: rowData.dateEcheance || '',
				libelleCompteTiers: rowData.libelleCompteTiers || 'Non défini',
				libelleEcriture: rowData.libelleEcriture || 'Non défini',
				libelleEcritureAnnee: rowData.libelleEcritureAnnee || 'Non défini',
				libelleEcritureMois: rowData.libelleEcritureMois || 'Non défini',
				libelleEcriturePrefixe: rowData.libelleEcriturePrefixe || 'Non défini',
				libelleEcritureTrimestre: rowData.libelleEcritureTrimestre || 'Non défini',
				libelleEcritureBeneficiaire: rowData.libelleEcritureBeneficiaire || 'Non défini',
				credit: rowData.credit ? keepTwoDecimals(Number(rowData.credit)) : '0.00',
				debit: rowData.debit ? keepTwoDecimals(Number(rowData.debit)) : '0.00',
				nomFichier: rowData.nomFichier ?? 'Non défini',
				rubriqueTreso: rowData.rubriqueTreso || 'Non défini',
				modeReglement: rowData.modeReglement || 'Non défini',
				noCompteBanque: rowData.noCompteBanque || 'Non défini',
				banqueReglement: rowData.banqueReglement || 'Non défini',
				statut: rowData.statut || 'A REGULARISER',
				commentaire: rowData.commentaire || '',
				dateOrdo: rowData.dateOrdo || '',
				refSourceTiers: rowData.refSourceTiers || '',
				reference_paiement: rowData.reference_paiement || '',
			}
			setDetails(formattedDetails)

			// Load PDF if available
			if (rowData?.nomFichier) {
				const pdfUrl = `http://192.168.0.254:8080/usv_prod/courriers/${rowData.nomFichier.replace(/\\/g, '/')}`
				setCourrier(pdfUrl)
				setIsPdfLoaded(validatePdfLink(pdfUrl)) // Validate the PDF link
			} else {
				setCourrier(null)
				setIsPdfLoaded(false) // No PDF link available
			}
		} else {
			console.error('Aucune donnée de ligne trouvée dans location.state.fullRowDetails.')
		}
	}, [location?.state?.fullRowDetails])

	// Handle modal toggling
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

	const handleConfirm = () => {
		setModalStates((prev) => ({ ...prev, showModal: false })) // Close the modal
		if (details) {
			navigate(`/commandes/tresorerie/etalement-recette-tiers/${details.cle}`) // Navigate to EtalementRecetteTiers.tsx
		}
	}

	const handleCancel = () => {
		setModalStates((prev) => ({ ...prev, showModal: false }))
	}

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			document.body.classList.remove('no-scroll')
		}
	}, [])

	if (!details) {
		return <p>Aucune recette disponible pour la clé sélectionnée.</p>
	}

	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | DÉTAILS ENCAISSEMENT ${details.societe} N° ${details.cle}` }} />
			<main id='detailsEncaissement'>
				<div className='detailsContainer'>
					<div className='leftSide'>
						{courrier && isPdfLoaded ? (
							<iframe
								src={courrier}
								title='Courrier associé'
								className='courrierDisplay'
								onError={() => setIsPdfLoaded(false)} // Fallback in case the PDF fails to load
							/>
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
							ENCAISSEMENT RECETTE N° {details.cle}{' '}
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
								<strong>Date facture :</strong> {details.dateSaisie || 'Non défini'}
							</div>
							<div>
								<strong>Société facturée :</strong> {details.libelleCompteTiers || 'Non défini'}
							</div>
							<div>
								<strong>Tiers (payeur) :</strong> {details.societe || 'Non défini'}
							</div>
							<div>
								<strong>Libellé :</strong> {details.libelleEcriture || 'Non défini'}
							</div>
							<div>
								<strong>Date échéance :</strong>
								<input
									type='date'
									value={details.dateEcheance || ''}
									onChange={(e) => setDetails({ ...details, dateEcheance: e.target.value })}
								/>
							</div>
							<div>
								<strong>Reçu le :</strong>
								<input
									type='date'
									value={details.dateOrdo || ''}
									onChange={(e) => setDetails({ ...details, dateOrdo: e.target.value })}
								/>
							</div>
							<div>
								<strong>Montant en euros :</strong>{' '}
								<input
									type='number'
									value={parseFloat(details.credit.replace(/\s/g, '').replace(',', '.'))}
									step='0.01'
									onChange={(e) => setDetails({ ...details, credit: e.target.value })}
								/>
							</div>

							<div>
								<strong>Payé par :</strong>
								<select
									value={details.modeReglement || ''}
									onChange={(e) => setDetails({ ...details, modeReglement: e.target.value })}
								>
									<option value='CAISSE'>Caisse</option>
									<option value='CHEQUE'>Chèque</option>
									<option value='TRAITE'>Traite</option>
									<option value='VIREMENT'>Virement</option>
								</select>
							</div>
							<div>
								<strong>Remis le :</strong>
								<input
									type='date'
									value={details.dateOrdo || ''}
									onChange={(e) => setDetails({ ...details, dateOrdo: e.target.value })}
								/>
							</div>
							<div>
								<strong>sur le compte bancaire :</strong>{' '}
								<select
									value={details.noCompteBanque || ''}
									onChange={(e) => setDetails({ ...details, noCompteBanque: e.target.value })}
								>
									<option value='000257117126 - SOCIETE GENERALE'>000257117126 - SOCIETE GENERALE</option>
									<option value='000257117127 - BNP PARIBAS'>000257117127 - BNP PARIBAS</option>
								</select>
							</div>
							<div>
								<strong>Réf. justificatif bancaire :</strong>
								<input
									type='text'
									style={{ width: '32rem' }}
									value={details.reference_paiement || ''}
									onChange={(e) => setDetails({ ...details, reference_paiement: e.target.value })}
								/>
							</div>
							<div>
								<strong>Commentaire :</strong>
								<input
									type='text'
									style={{ width: '32rem' }}
									value={details.commentaire || ''}
									onChange={(e) => setDetails({ ...details, commentaire: e.target.value })}
								/>
							</div>
							<div>
								<strong>Statut :</strong>
								<select
									value={details.statut || ''}
									onChange={(e) => setDetails({ ...details, statut: e.target.value })}
								>
									<option value='A ORDONNANCER'>À ordonnancer</option>
									<option value='ATTENTE ENCAISSEMENT'>Attente encaissement</option>
									<option value='ENCAISSEMENT'>À l'encaissement</option>
									<option value='LITIGE'>Litige</option>
								</select>
							</div>
						</div>

						{modalStates.showModal && (
							<ConfirmationModal
								message='Confirmez-vous l’étalement de cette recette par la création d’un échéancier ?'
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
									onClick: () => alert('Encaissement validé'),
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

export default DetailsEncaissement
