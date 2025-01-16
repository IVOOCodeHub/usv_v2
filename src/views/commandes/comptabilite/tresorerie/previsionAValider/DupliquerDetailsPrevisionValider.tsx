import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'
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

const DupliquerDetailsPrevisionValider: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState

	const [courrier, setCourrier] = useState<string | null>(null)
	const [details, setDetails] = useState<RowDetails | null>(null)
	

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
				credit:
					rowData.credit && !isNaN(parseFloat(rowData.credit.replace(/\s/g, '').replace(',', '.')))
						? keepTwoDecimals(Number(rowData.credit.replace(/\s/g, '').replace(',', '.')))
						: '0.00',
				debit:
					rowData.debit && !isNaN(parseFloat(rowData.debit.replace(/\s/g, '').replace(',', '.')))
						? keepTwoDecimals(Number(rowData.debit.replace(/\s/g, '').replace(',', '.')))
						: '0.00',
				statut: rowData.statut || 'A VALIDER',
				refSourceTiers: rowData.refSourceTiers || 'Non défini',
				nomFichier: rowData.nomFichier ?? 'Non défini',
			}
			setDetails(formattedDetails)
			

			if (rowData.nomFichier) {
				setCourrier(`http://192.168.0.254:8080/usv_prod/courriers/${rowData.nomFichier.replace(/\\/g, '/')}`)
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
		console.log('Données sauvegardées (mocked) :', updatedDetails)
		alert('Fonctionnalité de sauvegarde non implémentée pour le moment.')
	}

	const getMontantValue = (credit: string, debit: string): number => {
		const parseNumber = (value: string): number => {
			const cleanedValue = value.replace(/\s/g, '').replace(',', '.')
			return !isNaN(parseFloat(cleanedValue)) ? parseFloat(cleanedValue) : 0
		}

		if (credit) {
			return parseNumber(credit)
		} else if (debit) {
			return parseNumber(debit)
		}
		return 0
	}

	if (!details) {
		return <p>Aucune prévision disponible pour la clé sélectionnée.</p>
	}

	return (
		<>
			<Header
				props={{ pageURL: `GIVOO | TRÉSORERIE | DUPLICATION DE LA PREVISION ${details.cle} COURRIER ${details.cle}` }}
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

					<div className='rightSide'>
						<h3>NOUVELLE PRÉVISON</h3>

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
							</div>
							<div>
								<strong>Rubrique : </strong>
								{details.rubriqueTreso || ''}
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
										{prefixes.map((prefixe, index) => (
											<option key={index} value={prefixe}>
												{prefixe}
											</option>
										))}
									</select>
									<select
										value={details.libelleEcritureMois || ''}
										onChange={(e) => setDetails({ ...details, libelleEcritureMois: e.target.value })}
									>
										<option value=''>Mois</option>
										{mois.map((mois, index) => (
											<option key={index} value={mois}>
												{mois}
											</option>
										))}
									</select>
									<select
										value={details.libelleEcritureAnnee || ''}
										onChange={(e) => setDetails({ ...details, libelleEcritureAnnee: e.target.value })}
									>
										<option value=''>Année</option>
										{annees.map((annee, index) => (
											<option key={index} value={annee}>
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
								<strong>Montant en € :</strong>{' '}
								<input
									type='number'
									value={getMontantValue(details.credit, details.debit)}
									step='0.01'
									onChange={(e) => {
										const value = e.target.value
										const numericValue = parseFloat(value.replace(/\s/g, '').replace(',', '.'))
										if (!isNaN(numericValue)) {
											setDetails({ ...details, credit: value })
										} else {
											setDetails({ ...details, credit: '0' }) // Default to '0' if invalid
										}
									}}
									onBlur={() => handleSave(details)}
								/>
							</div>
							<div>
								<strong>Date échéance : </strong>{' '}
								<input
									type='date'
									value={details.dateEcheance ?? ''}
									onChange={(e) => setDetails({ ...details, dateEcheance: e.target.value })}
									onBlur={() => handleSave(details)}
								/>
							</div>
							<div>
								<strong>Date ordo. : </strong>{' '}
								<input
									type='date'
									value={details.dateOrdo ?? ''}
									onChange={(e) => setDetails({ ...details, dateOrdo: e.target.value })}
									onBlur={() => handleSave(details)}
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

export default DupliquerDetailsPrevisionValider
