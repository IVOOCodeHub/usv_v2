import './nouvellePrevisionDepenses.scss'

// hooks | libraries
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { useEffect, useState, useContext, ReactElement } from 'react'

// components
import Select, { StylesConfig } from 'react-select'

interface Option {
	value: string
	label: string
}
import withAuth from '../../../../../views/auth/withAuth'
import Header from '../../../../../components/header/Header'
// import Loader from '../../../../../components/loader/Loader'
import SelectGroup from '../../../../../components/selectGroup/SelectGroup.tsx'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'

// context
import { LoaderContext } from '../../../../../context/loaderContext.tsx'
import { UserContext } from '../../../../../context/userContext'
import { CourrierContext } from '../../../../../context/courrierContext.tsx'
import { ICourrierDepenses } from '../../../../../utils/types/courrier.interface.ts'

const NouvellePrevisionDepenses = () => {
	const navigate: NavigateFunction = useNavigate()
	const { isLoading, startLoading, stopLoading } = useContext(LoaderContext)
	const { user } = useContext(UserContext)
	const [pdfZoneMessage, setPdfZoneMessage] = useState<string>(
		'Sélectionnez un courrier pour afficher le document PDF.'
	)
	const [hasSearched, setHasSearched] = useState<boolean>(false)
	const [hasError, setHasError] = useState<boolean>(false)
	const { courrierDepenses, getCourrierDepenses } = useContext(CourrierContext)
	const [bodyArray, setBodyArray] = useState<string[][]>([])
	const [pieceToDisplay, setPieceToDisplay] = useState<ICourrierDepenses | null | undefined>(null)

	// États pour chaque champ du formulaire
	const [cleCourrier, setCleCourrier] = useState<string>('')
	const [datePiece, setDatePiece] = useState<string>('')
	const [societe, setSociete] = useState<string>('')
	const [tiers, setTiers] = useState<string>('')
	const [rubrique, setRubrique] = useState<string>('')
	const [montantTTC, setMontantTTC] = useState<string>('')
	const [avecTVA, setAvecTVA] = useState<boolean>(false)
	const [tva20, setTva20] = useState<string | ''>('') // Initialisation à une chaîne vide
	const [dateEcheance, setDateEcheance] = useState<string>('')
	const [dateOrdo, setDateOrdo] = useState<string>('')
	// États pour le groupe "Libellé"
	const [prefixeLibelle, setPrefixeLibelle] = useState<string>('')
	const [mois, setMois] = useState<string>('')
	const [trim, setTrim] = useState<string>('')

	// Personnalisation du style des champs de saisie SELECT

	const customSelectStyles: StylesConfig<Option, false> = {
		control: (provided) => ({
			...provided,
			border: '1px solid #36395a',
			borderRadius: 'unset',
			background: '#f2f2f2',
			minHeight: '38px',
			width: '230px', // Correspond à la largeur des autres champs
			padding: '0', // Réinitialise le padding pour éviter l'effet démesuré
			display: 'flex',
			alignItems: 'center',
			textAlign: 'center',
			boxShadow: 'none',
			'&:hover': {
				borderColor: '#36395a',
			},
		}),
		singleValue: (provided) => ({
			...provided,
			textAlign: 'center',
			color: '#36395a',
			fontSize: '12px', // Ajuste la taille de la police pour correspondre aux autres champs
		}),
		placeholder: (provided) => ({
			...provided,
			textAlign: 'center',
			color: '#aaa',
			fontSize: '12px',
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			color: '#36395a',
			padding: '0', // Supprime le padding autour de l'indicateur
		}),
		indicatorSeparator: () => ({
			display: 'none',
		}),
		menu: (provided) => ({
			...provided,
			textAlign: 'left',
		}),
	}

	// Effet pour calculer automatiquement la TVA
	useEffect(() => {
		const montant = parseFloat(montantTTC)
		if (avecTVA && montant > 0) {
			setTva20(((montant / 120) * 20).toFixed(2)) // Calcul de la TVA
		} else {
			setTva20('') // Réinitialiser si non applicable
		}
	}, [avecTVA, montantTTC])

	const convertToArray: (datas: ICourrierDepenses[]) => string[][] = (datas: ICourrierDepenses[]): string[][] => {
		return datas.map((data: ICourrierDepenses): string[] => [
			data.index,
			data.dhSaisie,
			data.societeEmettrice,
			data.societe,
			data.nature,
			data.action,
			data.commentaire,
		])
	}

	useEffect((): void => {
		startLoading()
		if (user) {
			const userCredentials = {
				matricule: user.matricule,
				password: user.password,
			}
			getCourrierDepenses(userCredentials).finally(stopLoading)
		}
	}, [])

	useEffect((): void => {
		if (Array.isArray(courrierDepenses)) {
			setBodyArray(convertToArray(courrierDepenses))
		}
	}, [getCourrierDepenses, courrierDepenses])

	const searchCleCourrier = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCleCourrier(e.target.value)
		console.log('clé courrier : ', cleCourrier)
	}

	const getSelectedCourrier = (): void => {
		setHasSearched(true) // Marque qu'une recherche a été effectuée

		if (!cleCourrier.trim()) {
			setPdfZoneMessage('Veuillez entrer une clé de courrier.')
			setPieceToDisplay(null)
			setHasError(true)
			return
		}

		setHasError(false)

		if (Array.isArray(courrierDepenses)) {
			const selectedCourrier = courrierDepenses.find(
				(courrier: ICourrierDepenses): boolean => courrier.index === cleCourrier
			)

			if (selectedCourrier) {
				setPdfZoneMessage('Document trouvé et prêt à afficher.')
				setPieceToDisplay(selectedCourrier)
				setTiers(selectedCourrier.societeEmettrice)
				console.log('PDF sélectionné :', selectedCourrier.fileName)
				console.log('Tiers sélectionné :', selectedCourrier.societeEmettrice)
				return
			}
		}

		setPdfZoneMessage('Aucun courrier trouvé pour cette clé.')
		setPieceToDisplay(null)
	}

	// Simplified logic for displaying the PDF content
	let pdfContent

	if (!hasSearched) {
		pdfContent = <p className='pdfDisplayZone'>Sélectionnez un courrier pour afficher le document PDF.</p>
	} else if (pieceToDisplay?.fileName) {
		pdfContent = (
			<iframe title='courrier' src={`http://192.168.0.254:8080/usv_prod/courriers/${pieceToDisplay.fileName}`} />
		)
	} else {
		pdfContent = <p className='pdfDisplayZone'>{pdfZoneMessage}</p>
	}

	// Fonction pour soumettre le formulaire
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		// let calculatedTva20 = 0 // Variable temporaire pour stocker la TVA calculée

		// // Calcul automatique du montant de la TVA à partir du montant TTC si la case avec TVA est cochée
		// if (avecTVA && montantTTC !== null && montantTTC !== undefined) {
		// 	calculatedTva20 = Math.round((montantTTC / 120) * 20) // Calculez la TVA
		// 	setTva20(calculatedTva20) // Mettez à jour l'état pour les prochains rendus
		// }

		// Créer un tableau d'objets avec les données du formulaire
		const formData = [
			{ label: 'Clé courrier', value: cleCourrier },
			{ label: 'Date pièce', value: datePiece },
			{ label: 'Société', value: societe },
			{ label: 'Tiers', value: tiers },
			{ label: 'Rubrique', value: rubrique },
			{ label: 'Montant TTC', value: montantTTC },
			{ label: 'Avec TVA', value: avecTVA ? 'Oui' : 'Non' },
			{ label: 'TVA 20%', value: tva20 }, // Utilisez la TVA calculée ici
			{ label: 'Date échéance', value: dateEcheance },
			{ label: 'Date Ordo.', value: dateOrdo },
		]

		// Afficher dans la console
		console.log('Données du formulaire :', formData)
	}

	return (
		<>
			<Header
				props={{
					pageURL: 'GIVOO | TRÉSORERIE | NOUVELLE PRÉVISION DÉPENSES',
				}}
			/>
			<main id={'nouvellePrevisionDepenses'}>
				<div className={'leftSide'}>
					<div className={'formContainer'}>
						<form onSubmit={handleSubmit}>
							<h3>Nouvelle prévision de dépense</h3>
							<div className={'inputWrapper'}>
								<label>Clé courrier : </label>
								<div className='cleCourrierWrapper'>
									<div className={'btnVoir'}>
										<Button
											props={{
												style: 'blue',
												text: 'Voir',
												type: 'button',
												onClick: () => {
													getSelectedCourrier()
												},
											}}
										/>
									</div>
									<input
										type={'number'}
										id='cleCourrier'
										name='cleCourrier'
										value={cleCourrier}
										onChange={searchCleCourrier}
										className={hasError ? 'error' : ''}
									/>
								</div>
							</div>
							<div className={'inputWrapper'}>
								<label>Date pièce : </label>
								<input type={'date'} value={datePiece} onChange={(e) => setDatePiece(e.target.value)} />
							</div>
							<div className={'inputWrapper'}>
								<label>Société : </label>
								<Select
									options={[
										{ value: '', label: 'Choisir' },
										{ value: 'BB', label: 'BB' },
										{ value: 'ECOASSIS', label: 'ECOASSIS' },
										{ value: 'FAJ', label: 'FAJ' },
										{ value: 'FI_IMMO', label: 'FI_IMMO' },
										{ value: 'FLEURIAU', label: 'FLEURIAU' },
										{ value: 'GEAS', label: 'GEAS' },
										{ value: 'GELS', label: 'GELS' },
										{ value: 'GEMP', label: 'GEMP' },
										{ value: 'GEMV', label: 'GEMV' },
										{ value: 'IVOB', label: 'IVOB' },
										{ value: 'IVOO', label: 'IVOO' },
										{ value: 'IVOR', label: 'IVOR' },
										{ value: 'IVOS', label: 'IVOS' },
										{ value: 'PVF', label: 'PVF' },
										{ value: 'SBL', label: 'SBL' },
										{ value: 'SBL BNC', label: 'SBL BNC' },
										{ value: 'SCI_IMO_BECQUET', label: 'SCI_IMO_BECQUET' },
										{ value: 'SITAP', label: 'SITAP' },
										{ value: 'STENICO_RE', label: 'STENICO_RE' },
									]}
									styles={customSelectStyles}
									onChange={(selectedOption) => setSociete(selectedOption?.value ?? '')}
								/>
							</div>
							<div className={'inputWrapper'}>
								<label>Tiers</label>
								<div className='tiersInput'>
									<input type={'text'} id='tiers' name='tiers' value={tiers} readOnly />
								</div>
							</div>
							<div className={'inputWrapper'}>
								<label>Rubrique : </label>
								<Select
									options={[
										{ value: '', label: 'Choisir' },
										{ value: 'AUTRES RECETTES', label: 'AUTRES RECETTES' },
										{ value: 'BANQUE', label: 'BANQUE' },
										{ value: 'CHARGES SALARIALES', label: 'CHARGES SALARIALES' },
										{ value: 'CLIENTS', label: 'CLIENTS' },
										{ value: 'COMPTE COURANT', label: 'COMPTE COURANT' },
										{ value: 'ELECTRICITE-EAU', label: 'ELECTRICITE-EAU' },
										{ value: 'FOURNISSEURS', label: 'FOURNISSEURS' },
										{ value: 'HONORAIRES', label: 'HONORAIRES' },
										{ value: 'IMPOTS ET TAXES', label: 'IMPOTS ET TAXES' },
										{ value: 'INTERCO', label: 'INTERCO' },
										{ value: 'LOYERS', label: 'LOYERS' },
										{ value: 'NOTE DE FRAIS', label: 'NOTE DE FRAIS' },
										{ value: 'PAIE SOLDE', label: 'PAIE SOLDE' },
										{ value: 'PERSONNEL EXTERNE', label: 'PERSONNEL EXTERNE' },
										{ value: 'SAISIES', label: 'SAISIES' },
										{ value: 'SBL', label: 'SBL' },
										{ value: 'TELECOM', label: 'TELECOM' },
									]}
									styles={customSelectStyles}
									onChange={(selectedOption) => setRubrique(selectedOption?.value ?? '')}
								/>
							</div>
							<div className={'inputWrapper selectGroup'}>
								<label>Libellé :</label>
								<SelectGroup
									props={{
										selectProps: {
											isClearable: true,
										},
										optionsData: [
											{
												libelle: 'Préfixe libellé',
												options: [
													{ value: '0', label: 'Choisir' },
													{ value: 'ADMIN', label: 'ADMIN' },
													{ value: 'ANIM', label: 'ANIM' },
													{ value: 'AVOIR', label: 'AVOIR' },
													{ value: 'CIONS', label: 'CIONS' },
													{ value: 'FORM', label: 'FORM' },
													{ value: 'MADP', label: 'MADP' },
													{ value: 'REMBT', label: 'REMBT' },
													{ value: 'RETRO', label: 'RETRO' },
													{ value: 'VIRT', label: 'VIRT' },
													{ value: 'VIVIF', label: 'VIVIF' },
													{ value: 'VIVMA', label: 'VIVMA' },
													{ value: 'VIVRE', label: 'VIVRE' },
												],
											},
											{
												libelle: 'Mois',
												options: [
													{ value: '01', label: 'Janvier' },
													{ value: '02', label: 'Février' },
													{ value: '03', label: 'Mars' },
													{ value: '04', label: 'Avril' },
													{ value: '05', label: 'Mai' },
													{ value: '06', label: 'Juin' },
													{ value: '07', label: 'Juillet' },
													{ value: '08', label: 'Août' },
													{ value: '09', label: 'Septembre' },
													{ value: '10', label: 'Octobre' },
													{ value: '11', label: 'Novembre' },
													{ value: '12', label: 'Décembre' },
												],
											},
											{
												libelle: 'Trimestre',
												options: [
													{ value: '0', label: 'Choisir' },
													{ value: '1er trimestre', label: '1er trimestre' },
													{
														value: '2ème trimestre',
														label: '2ème trimestre',
													},
													{
														value: '3ème trimestre',
														label: '3ème trimestre',
													},
													{
														value: '4ème trimestre',
														label: '4ème trimestre',
													},
												],
											},
										],

										// onChange: (selectedOption, group) => {
										// 	if (group === 'Préfixe libellé') setPrefixeLibelle(selectedOption?.value || '')
										// 	else if (group === 'Mois') setMois(selectedOption?.value || '')
										// 	else if (group === 'Trim') setTrim(selectedOption?.value || '')
										// },
									}}
								/>
							</div>
							<div className={'inputWrapper'}>
								<label>Montant TTC : </label>
								<div className='inputWithSymbol'>
									<input
										type={'number'}
										value={montantTTC}
										onChange={(e) => {
											const value = e.target.value
											setMontantTTC(value) // Met à jour l'état avec la chaîne saisie
										}}
									/>
									<span className='symbol'>€</span>
								</div>
							</div>
							<div className={'inputWrapper'}>
								<label>Avec TVA : </label>
								<input type={'checkbox'} checked={avecTVA} onChange={(e) => setAvecTVA(e.target.checked)} />
							</div>
							<div className={'inputWrapper'}>
								<label>TVA 20% :</label>
								<div className='inputWithSymbol'>
									<input type='text' value={tva20 ?? ''} readOnly />
									<span className='symbol'>€</span>
								</div>
							</div>

							<div className={'inputWrapper'}>
								<label>Date échéance : </label>
								<input type={'date'} value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} />
							</div>
							<div className={'inputWrapper'}>
								<label>Date Ordo. : </label>
								<input type={'date'} value={dateOrdo} onChange={(e) => setDateOrdo(e.target.value)} />
							</div>
							<div className={'buttonWrapper'}>
								<Button
									props={{
										style: 'blue',
										text: 'Valider',
										type: 'submit',
									}}
								/>
								<Button
									props={{
										style: 'grey',
										text: 'Annuler',
										type: 'button',
										onClick: (): void => navigate(-1),
									}}
								/>
							</div>
						</form>
					</div>
				</div>
				<div className='rightSide'>{pdfContent}</div>

				<Button
					props={{
						style: 'grey',
						text: 'Retour',
						type: 'button',
						onClick: (): void => navigate('/commandes/tresorerie/menu'),
					}}
				/>
			</main>
			<Footer />
		</>
	)
}

// export default NouvellePrevisionDepenses

const NouvellePrevisionDepensesWithAuth: (props: object) => ReactElement | null = withAuth(NouvellePrevisionDepenses)

export default NouvellePrevisionDepensesWithAuth
