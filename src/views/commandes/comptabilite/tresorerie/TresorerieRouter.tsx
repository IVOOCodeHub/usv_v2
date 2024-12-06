// types
import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'

// views

import TresorerieMenu from './tresorerieMenu/TresorerieMenu.tsx'
import CourrierDepenses from './courrierDepenses/CourrierDepenses.tsx'
import CourrierConsult from './courrierConsult/CourrierConsult.tsx'
import CourrierRelance from './courrierRelance/CourrierRelance.tsx'
import NouvellePrevisionDepenses from './nouvellePrevisionDepenses/NouvellePrevisionDepenses.tsx'
import NouvellePrevisionRecette from './nouvellePrevisionRecette/NouvellePrevisionRecette.tsx'

export default function TresorerieRouter(): ReactElement {
	return (
		<Routes>
			<Route path={'menu'} element={<TresorerieMenu />} />
			<Route path={'courrier_depenses'} element={<CourrierDepenses />} />
			<Route path={'courrier_consult'} element={<CourrierConsult />} />
			<Route path={'courrier_relance'} element={<CourrierRelance />} />
			<Route path={'nouvelle_prevision_depenses'} element={<NouvellePrevisionDepenses />} />
			<Route path={'nouvelle_prevision_recette'} element={<NouvellePrevisionRecette />} />
		</Routes>
	)
}
