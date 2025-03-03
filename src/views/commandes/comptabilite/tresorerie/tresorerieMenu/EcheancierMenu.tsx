// styles
import './echeancierMenu.scss'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { useNavigate, NavigateFunction } from 'react-router-dom'

// components
import withAuth from '../../../../auth/WithAuth.tsx'
import Header from '../../../../../components/header/Header.tsx'
import Button from '../../../../../components/button/Button.tsx'
import MenuContainer, { IMenuContainerProps } from '../../../../../components/menu/MenuContainer.tsx'
import Footer from '../../../../../components/footer/Footer.tsx'

function EcheancierMenu(): ReactElement {
	const navigate: NavigateFunction = useNavigate()
	const menuData: IMenuContainerProps[] = [
		{
			title: 'PRELEVEMENTS - SOCIETE',
			items: [
				{ name: "Gestion de l'échéancier", link: '/commandes/tresorerie/echeancier/echeancier_gestion' },
				{
					name: 'Traitement des prélèvements du mois',
					link: '/commandes/tresorerie/echeancier/traitement_prelevement',
				},
			],
		},
	]
	return (
		<>
			<Header props={{ pageURL: 'G_IVOO | Échéancier' }} />
			<main id={'echeancierMenu'}>
				<MenuContainer menuData={menuData} />
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

const EcheancierMenuWithAuth: (props: object) => ReactElement | null = withAuth(EcheancierMenu)
export default EcheancierMenuWithAuth
