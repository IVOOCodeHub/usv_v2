import './nouvellePrevisionDepenses.scss'

// hooks | libraries
// import { useNavigate, NavigateFunction } from 'react-router-dom'
// import { NRTL } from 'nillys-react-table-library'
// import { useEffect, useState, useContext, ReactElement } from 'react'

// // components
// import withAuth from '../../../../../views/auth/withAuth'
import Header from '../../../../../components/header/Header'
// import Loader from '../../../../../components/loader/Loader'
// import Button from '../../../../../components/button/Button.tsx'
// import Footer from '../../../../../components/footer/Footer'

// // context
// import { LoaderContext } from '../../../../../context/loaderContext.tsx'
// import { UserContext } from '../../../../../context/userContext'
// import { CourrierContext } from '../../../../../context/courrierContext.tsx'
// import { ICourrierDepenses } from '../../../../../utils/types/courrier.interface.ts'

const NouvellePrevisionDepenses = () => {
	return (
		<>
			<Header
				props={{
					pageURL: 'GIVOO | TRESORÉRIE | NOUVELLE PREVISION DÉPENSES',
				}}
			/>

			<h1>Nouvelle Prévision Dépenses</h1>
		</>
	)
}
export default NouvellePrevisionDepenses
