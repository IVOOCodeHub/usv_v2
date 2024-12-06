import './nouvellePrevisionRecette.scss'

// hooks | libraries
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { useEffect, useState, useContext, ReactElement } from 'react'

// components
import Select, { StylesConfig } from 'react-select'

interface Option {
	value: string
	label: string
}
// import withAuth from '../../../../../views/auth/withAuth'
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

const NouvellePrevisionRecette = () => {
	return <div>NouvellePrevisionRecette</div>
}
export default NouvellePrevisionRecette
