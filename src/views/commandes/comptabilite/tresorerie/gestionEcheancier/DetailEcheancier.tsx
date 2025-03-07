import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import './detailEcheancier.scss'
import { mockedEcheances } from './mock/mockEcheances.ts' // Assurez-vous que le chemin est correct

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
	montant: string
	rubriqueTreso: string
	nomFichier?: string
	dateOrdo: string
	modeReglement: string
	statut: string
	refSourceTiers: string
	ibanCible: string
	bicCible: string
	ibanSource: string
	bicSource: string
	libelleTiers: string
	noCompteBanque: string
	cleCourrier: string
	ibanTiers: string
	bicTiers: string
	nomBanque: string
	tiers: string
	contratTiers: string
	prefixe_libelle: string
	frequence: string
	jourMouvement: string
	dateDebut: string
	modePaiement: string
}

const DetailEcheancier: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [details, setDetails] = useState<RowDetails | null>(null)
	const [tiersOptions, setTiersOptions] = useState<string[]>([])
	const [contratTiersOptions, setContratTiersOptions] = useState<string[]>([])
	const [rubriqueTresoOptions, setRubriqueTresoOptions] = useState<string[]>([])
	const [prefixeLibelleOptions, setPrefixeLibelleOptions] = useState<string[]>([])
	const [frequenceOptions, setFrequenceOptions] = useState<string[]>([])

	useEffect(() => {
		const rowData = location?.state?.fullRowDetails
		if (rowData) {
			const fullRowDetails: RowDetails = {
				cle: rowData.cle || 'Non défini',
				societe: rowData.societe || 'Non défini',
				dateSaisie: rowData.dateSaisie || 'Non défini',
				dateEcheance: rowData.dateEcheance || 'Non défini',
				libelleCompteTiers: rowData.libelleCompteTiers || 'Non défini',
				libelleEcriture: rowData.libelleEcriture || 'Non défini',
				libelleEcritureAnnee: rowData.libelleEcritureAnnee || 'Non défini',
				libelleEcritureMois: rowData.libelleEcritureMois || 'Non défini',
				libelleEcriturePrefixe: rowData.libelleEcriturePrefixe || 'Non défini',
				libelleEcritureTrimestre: rowData.libelleEcritureTrimestre || 'Non défini',
				libelleEcritureBeneficiaire: rowData.libelleEcritureBeneficiaire || 'Non défini',
				credit: rowData.credit || 'Non défini',
				debit: rowData.debit || 'Non défini',
				montant: rowData.montant || 'Non défini',
				rubriqueTreso: rowData.rubriqueTreso || 'Non défini',
				nomFichier: rowData.nomFichier || 'Non défini',
				dateOrdo: rowData.dateOrdo || 'Non défini',
				modeReglement: rowData.modeReglement || 'Non défini',
				statut: rowData.statut || 'Non défini',
				refSourceTiers: rowData.refSourceTiers || 'Non défini',
				ibanCible: rowData.ibanCible || 'Non défini',
				bicCible: rowData.bicCible || 'Non défini',
				ibanSource: rowData.ibanSource || 'Non défini',
				bicSource: rowData.bicSource || 'Non défini',
				libelleTiers: rowData.libelleTiers || 'Non défini',
				noCompteBanque: rowData.noCompteBanque || 'Non défini',
				cleCourrier: rowData.cleCourrier || 'Non défini',
				ibanTiers: rowData.ibanTiers || 'Non défini',
				bicTiers: rowData.bicTiers || 'Non défini',
				nomBanque: rowData.nomBanque || 'Non défini',
				tiers: rowData.tiers || 'Non défini',
				contratTiers: rowData.contratTiers || 'Non défini',
				prefixe_libelle: rowData.prefixe_libelle || 'Non défini',
				frequence: rowData.frequence || 'Non défini',
				jourMouvement: rowData.jourMouvement || 'Non défini',
				dateDebut: rowData.dateDebut || 'Non défini',
				modePaiement: rowData.modePaiement || 'Non défini',
			}
			setDetails(fullRowDetails)
		} else {
			setDetails(null)
		}

		// Extract unique tiers options
		const uniqueTiers = Array.from(new Set(mockedEcheances.map((echeance) => echeance.tiers)))
		setTiersOptions(uniqueTiers)

		const uniqueContratTiers = Array.from(new Set(mockedEcheances.map((echeance) => echeance.contratTiers)))
		setContratTiersOptions(uniqueContratTiers)

		const uniqueRubriqueTreso = Array.from(new Set(mockedEcheances.map((echeance) => echeance.rubriqueTreso)))
		setRubriqueTresoOptions(uniqueRubriqueTreso)

		const uniquePrefixeLibelle = Array.from(new Set(mockedEcheances.map((echeance) => echeance.prefixe_libelle)))
		setPrefixeLibelleOptions(uniquePrefixeLibelle)

		const uniqueFrequence = Array.from(new Set(mockedEcheances.map((echeance) => echeance.frequence)))
		setFrequenceOptions(uniqueFrequence)
	}, [location?.state?.fullRowDetails])

	const handleInputChange = (field: keyof RowDetails, value: string) => {
		console.log(field, value)
	}

	return (
		<>
			<Header props={{ pageURL: `GIVOO | TRÉSORERIE | DÉTAILS DE L'ÉCHÉANCE ${details?.cle}` }} />
			<div id='detailEcheancier'>
				<div className='main-container'>
					<div className='coordonnees-container'>
						{/* Section Emetteur */}
						<section className='tab-panel'>
							<div className='form-container'>
								<label>
									Société :
									<input
										type='text'
										value={details?.societe ?? ''}
										onChange={(e) => handleInputChange('societe', e.target.value)}
									/>
								</label>
								<label>
									Tiers :
									<select
										value={details?.tiers ?? ''}
										onChange={(e) => setDetails({ ...details!, tiers: e.target.value } as RowDetails)}
									>
										<option value=''>Choisir</option>
										{tiersOptions.map((tiers, index) => (
											<option key={index} value={tiers}>
												{tiers}
											</option>
										))}
									</select>
								</label>
								<label>
									Identification contrat tiers :
									<select
										value={details?.contratTiers ?? ''}
										onChange={(e) => setDetails({ ...details!, contratTiers: e.target.value } as RowDetails)}
									>
										<option value=''>Choisir</option>
										{contratTiersOptions.map((contratTiers, index) => (
											<option key={index} value={contratTiers}>
												{contratTiers}
											</option>
										))}
									</select>
								</label>
								<label>
									Rubrique :
									<select
										value={details?.rubriqueTreso ?? ''}
										onChange={(e) => setDetails({ ...details!, rubriqueTreso: e.target.value } as RowDetails)}
									>
										<option value=''>Choisir</option>
										{rubriqueTresoOptions.map((rubriqueTreso, index) => (
											<option key={index} value={rubriqueTreso}>
												{rubriqueTreso}
											</option>
										))}
									</select>
								</label>
								<label>
									Libellé préfixe :
									<select
										value={details?.prefixe_libelle ?? ''}
										onChange={(e) => setDetails({ ...details!, prefixe_libelle: e.target.value } as RowDetails)}
									>
										<option value=''>Choisir</option>
										{prefixeLibelleOptions.map((prefixeLibelle, index) => (
											<option key={index} value={prefixeLibelle}>
												{prefixeLibelle}
											</option>
										))}
									</select>
								</label>
							</div>
						</section>

						{/* Section Destinataire */}
						<section className='tab-panel'>
							<div className='form-container'>
								<label>
									Mode de paiement :
									<select
										value={details?.modePaiement ?? ''}
										onChange={(e) => handleInputChange('modePaiement', e.target.value)}
									>
										<option value=''>Choisir</option>
										<option value='VIR'>Virement</option>
										<option value='PRELEV'>Prélèvement</option>
									</select>
								</label>
								<label>
									Montant :
									<input
										type='text'
										value={details?.montant ?? ''}
										onChange={(e) => handleInputChange('montant', e.target.value)}
									/>
								</label>
								<label>
									Banque émettrice :
									<input
										type='text'
										value={details?.nomBanque ?? ''}
										onChange={(e) => handleInputChange('nomBanque', e.target.value)}
									/>
								</label>
								<label>
									Fréquence :
									<select
										value={details?.frequence ?? ''}
										onChange={(e) => handleInputChange('frequence', e.target.value)}
									>
										<option value=''>Choisir</option>
										{frequenceOptions.map((frequence, index) => (
											<option key={index} value={frequence}>
												{frequence}
											</option>
										))}
									</select>
								</label>
							</div>
						</section>

						{/* Section Libellé */}
						<section className='tab-panel'>
							<div className='form-container'>
								<label>
									Date PREMIER mouvement :
									<input
										type='text'
										name='libelleEcriture'
										value={details?.libelleEcriture ?? ''}
										onChange={(e) => handleInputChange('libelleEcriture', e.target.value)}
									/>
								</label>
								<label>
									Date PROCHAIN mouvement :
									<input
										type='date'
										value={details?.dateOrdo ?? ''}
										onChange={(e) => handleInputChange('dateOrdo', e.target.value)}
									/>
								</label>
								<label>
									Date DERNIER mouvement :
									<input
										type='text'
										value={details?.dateFin ?? ''}
										onChange={(e) => handleInputChange('dateFin', e.target.value)}
									/>
								</label>
								<label>
									Statut :
									<input
										type='text'
										value={details?.statut ?? ''}
										onChange={(e) => handleInputChange('statut', e.target.value)}
									/>
								</label>
							</div>
						</section>
					</div>
				</div>

				<div className='actions'>
					<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => navigate(-1) }} />
				</div>
			</div>
		</>
	)
}

export default DetailEcheancier
