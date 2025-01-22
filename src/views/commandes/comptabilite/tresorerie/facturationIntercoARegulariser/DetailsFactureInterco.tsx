import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
import ModalCourriers from '../previsionAOrdonnancer/ModalCourriers.tsx'
import ModalTiers from '../previsionAValider/ModalTiers.tsx'
import AddTiersModal from '../previsionAValider/AddTiersModal.tsx'
import { keepTwoDecimals, convertENDateToFr, formatDateToHtml } from '../../../../../utils/scripts/utils.ts'
import './detailsFactureInterco.scss'

interface ILocationState {
	state: {
		fullRowDetails: {
			societe: string
			cle: string
			dateSaisie: string
			dateEcheance: string
			libelleCompteTiers: string
			libelleEcriture: string
			credit: string
			debit: string
			nomFichier?: string
			rubriqueTreso: string
			modeReglement: string
			noCompteBanque: string
			statut: string
			commentaire: string
		}
	}
}

interface RowDetails {
	societe: string
	cle: string
	dateSaisie: string
	dateEcheance: string
	libelleCompteTiers: string
	libelleEcriture: string
	credit: string
	debit: string
	nomFichier?: string
	rubriqueTreso: string
	modeReglement: string
	noCompteBanque: string
	statut: string
	commentaire: string
}

const DetailsFactureInterco: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState

	const [courrier, setCourrier] = useState<string | null>(null)
	const [isPdfLoaded, setIsPdfLoaded] = useState<boolean>(true)
	const [details, setDetails] = useState<RowDetails | null>(null)
	const [modalStates, setModalStates] = useState({
		isModalOpen: false,
		isTiersModalOpen: false,
		isAddTiersModalOpen: false,
	})

	// Mocked data for "Rubrique" and "Libellé" fields
	const [rubriques, setRubriques] = useState<{ cle: string; libelle: string }[]>([
		{ cle: '1', libelle: 'Rubrique 1' },
		{ cle: '2', libelle: 'Rubrique 2' },
	])
	const [prefixes, setPrefixes] = useState<string[]>(['Prefixe 1', 'Prefixe 2'])
	const [mois, setMois] = useState<string[]>(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
	const [annees, setAnnees] = useState<string[]>(['2023', '2024', '2025'])

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
				societe: rowData.societe || 'Non défini',
				cle: rowData.cle || 'Non défini',
				dateSaisie: rowData.dateSaisie ? convertENDateToFr(rowData.dateSaisie) : 'Non défini',
				dateEcheance: rowData.dateEcheance ? formatDateToHtml(rowData.dateEcheance) : 'Non défini',
				libelleCompteTiers: rowData.libelleCompteTiers || 'Non défini',
				libelleEcriture: rowData.libelleEcriture || 'Non défini',
				credit: rowData.credit ? keepTwoDecimals(Number(rowData.credit)) : '0.00',
				debit: rowData.debit ? keepTwoDecimals(Number(rowData.debit)) : '0.00',
				nomFichier: rowData.nomFichier ?? 'Non défini',
				rubriqueTreso: rowData.rubriqueTreso || 'Non défini',
				modeReglement: rowData.modeReglement || 'Non défini',
				noCompteBanque: rowData.noCompteBanque || 'Non défini',
				statut: rowData.statut || 'A REGULARISER',
				commentaire: rowData.commentaire || '',
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

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			document.body.classList.remove('no-scroll')
		}
	}, [])

	if (!details) {
		return <p>Aucune facture disponible pour la clé sélectionnée.</p>
	}

	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | DÉTAILS FACTURE INTERCO ${details.cle}` }} />
			<main id='detailsFactureInterco'>
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
							Facture {details.cle}{' '}
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
								<strong>Société :</strong> {details.societe || 'Non défini'}
							</div>
							<div>
								<strong>Code :</strong> {details.cle || 'Non défini'}
							</div>
							<div>
								<strong>Date saisie :</strong> {details.dateSaisie || 'Non défini'}
							</div>
							<div>
								<strong>Date échéance :</strong> {details.dateEcheance || 'Non défini'}
							</div>
							<div>
								<strong>Fournisseur :</strong> {details.libelleCompteTiers || 'Non défini'}
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
								<strong>Rubrique :</strong>
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
							<div>
								<strong>Mode Règlement :</strong>
								<select
									value={details.modeReglement || ''}
									onChange={(e) => setDetails({ ...details, modeReglement: e.target.value })}
								>
									<option value=''>Choisir</option>
									<option value='PRELEV'>Prélèvement</option>
									<option value='CHEQUE'>Chèque</option>
									<option value='VIR'>Virement</option>
								</select>
							</div>
							<div>
								<strong>Banq. Règlement :</strong> {details.noCompteBanque || 'Non défini'}
							</div>
							<div>
								<strong>Statut :</strong> {details.statut || 'Non défini'}
							</div>
							<div>
								<strong>Commentaire :</strong> {details.commentaire || 'Non défini'}
							</div>
						</div>
						<div className='buttonWrapper'>
							<Button
								props={{
									style: 'blue',
									text: 'Valider',
									type: 'button',
									onClick: () => alert('Facture validée'),
								}}
							/>
							<Button
								props={{
									style: 'grey',
									text: 'Retour',
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

export default DetailsFactureInterco
