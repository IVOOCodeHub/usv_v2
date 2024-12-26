import './previsionAOrdonnancer.scss'

// hooks | libraries
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, ReactElement, useContext } from 'react'

// components
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'

// contexts
import { UserContext } from '../../../../../context/userContext.tsx'
import { LoaderContext } from '../../../../../context/loaderContext.tsx'
import { PrevisionContext } from '../../../../../context/previsionContext/PrevisionContext.tsx'

// utils
import { convertFrDateToServerDate } from '../../../../../utils/scripts/utils.ts'

// types
interface ILocationState {
	state: {
		rowData: string[]
	}
}

const DetailsPrevisionOrdo = (): ReactElement => {
	const navigate = useNavigate()
	const location = useLocation() as ILocationState
	const { userCredentials } = useContext(UserContext)
	const { startLoading, stopLoading } = useContext(LoaderContext)
	const { getPrevisionOrdonnance, previsionsOrdonnance } = useContext(PrevisionContext)

	// States for data and details
	const [courrier, setCourrier] = useState<string | null>(null)
	const [details, setDetails] = useState<Record<string, string>>({})
	const [previsionCode, setPrevisionCode] = useState<string>('')
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

	// Charger les données une seule fois
	useEffect(() => {
		const loadData = async (): Promise<void> => {
			if (userCredentials && !isDataLoaded) {
				const validMinDate = convertFrDateToServerDate('01/01/1900')
				const validMaxDate = convertFrDateToServerDate('31/12/2100')

				startLoading()
				await getPrevisionOrdonnance(userCredentials, validMinDate, validMaxDate).finally(() => {
					stopLoading()
					setIsDataLoaded(true)
				})
			}
		}

		loadData()
	}, [userCredentials, getPrevisionOrdonnance, isDataLoaded, startLoading, stopLoading])

	// Rechercher les détails de la prévision une fois les données chargées
	useEffect(() => {
		if (isDataLoaded && location.state?.rowData && Array.isArray(previsionsOrdonnance)) {
			const rowData = location.state.rowData
			const selectedPrevision = previsionsOrdonnance.find((prevision) => prevision.cle === rowData[0])

			if (selectedPrevision) {
				const creditValue =
					typeof selectedPrevision.credit === 'number' ? selectedPrevision.credit.toFixed(2) : 'Non renseigné'

				setDetails({
					code: selectedPrevision.cle,
					dateSaisie: selectedPrevision.dateSaisie,
					echeance: selectedPrevision.dateEcheance,
					ordo: selectedPrevision.dateOrdo,
					fournisseur: selectedPrevision.libelleCompteTiers,
					libelle: selectedPrevision.libelleEcriture,
					destinataire: selectedPrevision.societe,
					montant: creditValue,
				})

				setCourrier(
					`http://192.168.0.254:8080/usv_prod/courriers/${selectedPrevision.dateOrdo.slice(
						0,
						4
					)}_${selectedPrevision.dateOrdo.slice(5, 7)}/${selectedPrevision.cle}.pdf`
				)

				setPrevisionCode(selectedPrevision.cle)
			} else {
				console.warn('Aucune prévision correspondante trouvée.')
			}
		}
	}, [isDataLoaded, location.state, previsionsOrdonnance])

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
							<p>Aucun courrier associé</p>
						)}
					</div>

					{/* Right side: Details and actions */}
					<div className='rightSide'>
						<h3>Prévision {details.code}</h3>
						<div className='detailsWrapper'>
							<p>
								<strong>Date saisie :</strong> {details.dateSaisie || 'Non renseigné'}
							</p>
							<p>
								<strong>Société :</strong> {details.fournisseur || 'Non renseigné'}
							</p>
							<p>
								<strong>Tiers :</strong> {details.destinataire || 'Non renseigné'}
							</p>
							<p>
								<strong>Rubrique :</strong> {details.libelle || 'Non renseigné'}
							</p>
							<p>
								<strong>Date échéance :</strong> {details.echeance || 'Non renseigné'}
							</p>
							<p>
								<strong>Date ordo. :</strong> {details.ordo || 'Non renseigné'}
							</p>
							<p>
								<strong>Montant :</strong> {details.montant} €
							</p>
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

export default DetailsPrevisionOrdo
