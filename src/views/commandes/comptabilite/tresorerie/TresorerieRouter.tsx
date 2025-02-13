// types
import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'

// views
import TresorerieMenuWithAuth from './tresorerieMenu/TresorerieMenu.tsx'
import TPChoixWithAuth from './tresorerieMenu/TPChoix.tsx'
import CourrierDepensesWithAuth from './courrierDepenses/CourrierDepenses.tsx'
import CourrierConsultWithAuth from './courrierConsult/CourrierConsult.tsx'
import CourrierRelanceWithAuth from './courrierRelance/CourrierRelance.tsx'
import CourrierRequalificationWithAuth from './courrierRequalification/CourrierRequalification.tsx'
import NouvellePrevisionDepensesWithAuth from './nouvellePrevisionDepenses/NouvellePrevisionDepenses.tsx'
import NouvellePrevisionRecetteWithAuth from './nouvellePrevisionRecette/NouvellePrevisionRecette.tsx'
import PrevisionAValider from './previsionAValider/PrevisionAValider.tsx'
import DetailsPrevisionValider from './previsionAValider/DetailsPrevisionValider.tsx'
import DupliquerDetailsPrevisionValider from './previsionAValider/DupliquerDetailsPrevisionValider.tsx'
import PrevisionAOrdonnancer from './previsionAOrdonnancer/PrevisionAOrdonnancer.tsx'
import DetailsPrevisionOrdo from './previsionAOrdonnancer/DetailsPrevisionOrdo.tsx'
import ModifyTiersPage from './previsionAOrdonnancer/ModifyTiersPage.tsx'
import EtalementPrevisionTiers from './previsionAOrdonnancer/EtalementPrevisionTiers.tsx'
import FacturationIntercoARegulariser from './facturationIntercoARegulariser/FacturationIntercoARegulariser.tsx'
import DetailsFactureInterco from './facturationIntercoARegulariser/DetailsFactureInterco.tsx'
import PrevisionsEnRetard from './PrevisionsEnRetard/PrevisionsEnRetard.tsx'
import DetailsPrevisionsRetard from './PrevisionsEnRetard/DetailsPrevisionsRetard.tsx'
import PrevisionOrdoSansCourrier from './previsionsOrdoSansCourrier/PrevisionOrdoSansCourrier.tsx'
import EmissionsODV from './emissionsTitresPaiements/EmissionsODV.tsx'
import VirementModifIban from './emissionsTitresPaiements/VirementModifIban.tsx'
import ValidationODV from './validationEmissionsODV/ValidationODV.tsx'
import EmissionCheques from './emissionCheques/EmissionCheques.tsx'
import DetailEmissionChq from './emissionCheques/DetailEmissionChq.tsx'
import EmisNonDecaisses from './emisNonDecaisses/EmisNonDecaisses.tsx'
import RecetteAOrdonnancer from './recetteAOrdonnancer/RecetteAOrdonnancer.tsx'
import DetailRecetteAOrdo from './recetteAOrdonnancer/DetailRecetteAOrdo.tsx'

export default function TresorerieRouter(): ReactElement {
	return (
		<Routes>
			<Route path={'menu'} element={<TresorerieMenuWithAuth />} />
			<Route path={'courrier_depenses'} element={<CourrierDepensesWithAuth />} />
			<Route path={'courrier_consult'} element={<CourrierConsultWithAuth />} />
			<Route path={'courrier_relance'} element={<CourrierRelanceWithAuth />} />
			<Route path={'courrier_requalification'} element={<CourrierRequalificationWithAuth />} />
			<Route path={'nouvelle_prevision_depenses'} element={<NouvellePrevisionDepensesWithAuth />} />
			<Route path={'nouvelle_prevision_recette'} element={<NouvellePrevisionRecetteWithAuth />} />
			<Route path={'prevision_a_valider'} element={<PrevisionAValider />} />
			<Route path={'details_prevision_valider'} element={<DetailsPrevisionValider />} />
			<Route path={'dupliquer_details_prevision_valider'} element={<DupliquerDetailsPrevisionValider />} />
			<Route path={'prevision_a_ordonnancer'} element={<PrevisionAOrdonnancer />} />
			<Route path={'details_prevision_ordo'} element={<DetailsPrevisionOrdo />} />
			<Route path={'/modify-tiers/:tiersId'} element={<ModifyTiersPage />} />
			<Route path={'/etalement-prevision-tiers/:tiersId'} element={<EtalementPrevisionTiers />} />
			<Route path={'/facturation_interco_a_regulariser'} element={<FacturationIntercoARegulariser />} />
			<Route path={'/details_facture_interco'} element={<DetailsFactureInterco />} />
			<Route path={'/prevision_en_retard'} element={<PrevisionsEnRetard />} />
			<Route path={'/details_prevision_retard'} element={<DetailsPrevisionsRetard />} />
			<Route path={'/prevision_ordo_sans_courrier'} element={<PrevisionOrdoSansCourrier />} />
			<Route path={'/menu_emission_tp'} element={<TPChoixWithAuth />} />
			<Route path={'/emissions_odv'} element={<EmissionsODV />} />
			<Route path={'/virement-modif-iban'} element={<VirementModifIban />} />;
			<Route path={'/validation_odv'} element={<ValidationODV />} />
			<Route path={'/emissions_cheques'} element={<EmissionCheques />} />
			<Route path={'/detail-emission-chq'} element={<DetailEmissionChq />} />
			<Route path={'/emis_non_decaisses'} element={<EmisNonDecaisses />} />
			<Route path={'/recette_a_ordonnancer'} element={<RecetteAOrdonnancer />} />
			<Route path={'/details_recette_ordonnancer'} element={<DetailRecetteAOrdo />} />
		</Routes>
	)
}
