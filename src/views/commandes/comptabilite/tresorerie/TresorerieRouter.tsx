// types
import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'

// views
import TresorerieMenu from './tresorerieMenu/TresorerieMenu.tsx'
import CourrierDepenses from './courrierDepenses/CourrierDepenses.tsx'
import CourrierConsult from './courrierConsult/CourrierConsult.tsx'
import NouvellePrevisionDepenses from './nouvellePrevisionDepenses/NouvellePrevisionDepenses.tsx'

export default function TresorerieRouter(): ReactElement {
	return (
		<Routes>
			<Route path={'menu'} element={<TresorerieMenu />} />
			<Route path={'courrier_depenses'} element={<CourrierDepenses />} />
			<Route path={'courrier_consult'} element={<CourrierConsult />} />
			<Route path={'nouvelle_prevision_depenses'} element={<NouvellePrevisionDepenses />} />
		</Routes>
	)
}
