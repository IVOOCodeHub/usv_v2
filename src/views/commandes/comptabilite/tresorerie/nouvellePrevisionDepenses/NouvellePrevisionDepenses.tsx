import './nouvellePrevisionDepenses.scss'

// hooks | libraries
import { useNavigate, NavigateFunction } from 'react-router-dom'
// import { NRTL } from 'nillys-react-table-library'
import { useEffect, useState, useContext, ReactElement } from 'react'

// components
import withAuth from '../../../../../views/auth/withAuth'
import Header from '../../../../../components/header/Header'
import DefinitionComponent from '../../../../../components/definition/DefinitionComponent.tsx'
import Form from '../../../../../components/form/Form.tsx'
import Loader from '../../../../../components/loader/Loader'
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
	const { courrierDepenses, getCourrierDepenses } = useContext(CourrierContext)

	const items = [
		{ label: 'Date pièce', value: '01/01/2024' },
		{ label: 'Société', value: 'OpenAI Inc.' },
		{ label: 'Rubrique', value: null },
		{ label: 'Montant TTC', value: '1234.56 €' },
		{ label: 'Banque règlement', value: undefined },
		{ label: 'Avec TVA', value: 'Oui' },
		{ label: 'Moins de 20% de TVA', value: 'Non' },
		{ label: 'TVA 20%', value: '246.91 €' },
		{ label: 'Date échéance', value: '31/12/2024' },
		{ label: 'Date Ordo.', value: '15/12/2024' },
	]
	return (
		<>
			<Header
				props={{
					pageURL: 'GIVOO | TRESORÉRIE | NOUVELLE PREVISION DÉPENSES',
				}}
			/>
			<main id={'nouvellePrevisionDepenses'}>
				<h1 id='title'>Nouvelle Prévision Dépenses</h1>
				<section className='componentsContainer'>
					<Form
						props={{
							title: 'Nouvelle Prévision Dépenses',
							inputs: [
								{
									label: 'Adresse mail :',
									key: 'email',
									type: 'email',
									placeholder: 'ex: decressac.nicolas@icloud.com',
									required: true,
								},
								{
									label: 'Prénom :',
									key: 'firstName',
									type: 'text',
									placeholder: 'ex: Nicolas',
									required: true,
								},
								{
									label: 'Date de naissance :',
									key: 'birthDate',
									type: 'date',
									required: true,
								},
								{
									label: 'Code TO :',
									key: 'matricule',
									type: 'number',
									placeholder: 'ex: 6176',
									required: true,
								},
								{
									label: 'Mot de passe TO :',
									key: 'password',
									type: 'password',
									placeholder: 'ex: decnic',
									required: true,
								},
								{
									label: 'CV :',
									key: 'file',
									type: 'file',
									required: false,
								},
							],
							isWithSubmitButton: true,
						}}
					/>
					<DefinitionComponent items={items} />
				</section>

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
