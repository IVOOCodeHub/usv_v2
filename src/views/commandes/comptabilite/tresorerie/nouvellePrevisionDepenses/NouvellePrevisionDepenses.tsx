import './nouvellePrevisionDepenses.scss'

// hooks | libraries
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { useEffect, useState, useContext, ReactElement } from 'react'

// components
import Select from 'react-select'
import withAuth from '../../../../../views/auth/withAuth'
import Header from '../../../../../components/header/Header'
import DefinitionComponent from '../../../../../components/definition/DefinitionComponent.tsx'
import Loader from '../../../../../components/loader/Loader'
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
	const [cleCourrier, setCleCourrier] = useState<string>('')
	const [pieceToDisplay, setPieceToDisplay] = useState<ICourrierDepenses | null | undefined>(null)

	useEffect(() => {
		// const selectedCourrier = getSelectedCourrier()
		// setPieceToDisplay(selectedCourrier)
	}, [])

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
				console.log('PDF sélectionné :', selectedCourrier.fileName)
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
						<form>
							<h3>Nouvelle prévision de dépense</h3>
							<div className={'inputWrapper'}>
								<label>Clé courrier : </label>
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
							<div className={'inputWrapper'}>
								<label>Date pièce : </label>
								<input type={'date'} />
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
								/>
							</div>
							<div className={'inputWrapper'}>
								<label>Tiers</label>
								<div className={'tiersWrapper'}>
									<p>1424 - MMA</p>
									<Button
										props={{
											style: 'grey',
											text: 'Prév',
											type: 'button',
										}}
									/>
									<Button
										props={{
											style: 'grey',
											text: 'Edit. tiers',
											type: 'button',
										}}
									/>
								</div>
							</div>
							<div className={'inputWrapper'}>
								<label>Rubrique : </label>
								<Select
									options={[
										{ value: '', label: 'Choisir' },
										{
											value: 'CHARGES SALARIALES',
											label: 'CHARGES SALARIALES',
										},
									]}
								/>
							</div>
							<div className={'inputWrapper'}>
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
												libelle: 'Trim',
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
									}}
								/>
							</div>
							<div className={'inputWrapper'}>
								<label>Montant TTC : </label>
								<input type={'number'} />
							</div>
							<div className={'inputWrapper'}>
								<label>Avec TVA : </label>
								<input type={'checkbox'} />
							</div>
							<div className={'inputWrapper'}>
								<label>TVA 20% : </label>
								<input type={'number'} />
							</div>
							<div className={'inputWrapper'}>
								<label>Date échéance : </label>
								<input type={'date'} />
							</div>
							<div className={'inputWrapper'}>
								<label>Date Ordo. : </label>
								<input type={'date'} />
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

export default NouvellePrevisionDepenses

// const NouvellePrevisionDepensesWithAuth: (props: object) => ReactElement | null = withAuth(NouvellePrevisionDepenses)

// export default NouvellePrevisionDepensesWithAuth
