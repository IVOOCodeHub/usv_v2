// types
import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'

// views
import TresorerieMenuWithAuth from './tresorerieMenu/TresorerieMenu.tsx'
import CourrierDepensesWithAuth from './courrierDepenses/CourrierDepenses.tsx'
import CourrierConsultWithAuth from './courrierConsult/CourrierConsult.tsx'
import CourrierRelanceWithAuth from './courrierRelance/CourrierRelance.tsx'
import CourrierRequalificationWithAuth from './courrierRequalification/CourrierRequalification.tsx'
import NouvellePrevisionDepensesWithAuth from './nouvellePrevisionDepenses/NouvellePrevisionDepenses.tsx'
import NouvellePrevisionRecetteWithAuth from './nouvellePrevisionRecette/NouvellePrevisionRecette.tsx'
import PrevisionAOrdonnancer from './previsionAOrdonnancer/PrevisionAOrdonnancer.tsx'
import DetailsPrevisionOrdo from './previsionAOrdonnancer/DetailsPrevisionOrdo.tsx'
import ModifyTiersPage from './previsionAOrdonnancer/ModifyTiersPage.tsx'

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
			<Route path={'prevision_a_ordonnancer'} element={<PrevisionAOrdonnancer />} />
			<Route path={'details_prevision_ordo'} element={<DetailsPrevisionOrdo />} />
			<Route path={'/modify-tiers/:tiersId'} element={<ModifyTiersPage />} />
		</Routes>
	)
}
