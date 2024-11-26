// styles
import './tresorerieMenu.scss'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { useNavigate, NavigateFunction } from 'react-router-dom'

// components
import withAuth from '../../../../../views/auth/withAuth'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import MenuContainer, { IMenuContainerProps } from '../../../../../components/menu/MenuContainer.tsx'
import Footer from '../../../../../components/footer/Footer'

function TresorerieMenu(): ReactElement {
	const navigate: NavigateFunction = useNavigate()
	const menuData: IMenuContainerProps[] = [
		{
			title: 'Dépenses',
			items: [
				{ name: 'Courrier', link: '/commandes/tresorerie/courrier_depenses' },
				{ name: 'Nouvelle prévision de dépenses', link: '/commandes/tresorerie/nouvelle_prevision_depenses' },
				{ name: 'Prévisions à valider', link: '/' },
				{ name: 'Facturation Interco à régulariser', link: '/' },
				{ name: 'Prévisions à ordonnancer', link: '/' },
				{ name: 'Prévisions en retard', link: '/' },
				{ name: 'Prévisions ordonnancées sans courrier', link: '/' },
				{ name: 'Émission des titres de paiements', link: '/' },
				{ name: 'Émis non décaissés', link: '/' },
			],
		},
		{
			title: 'Recettes',
			items: [
				{ name: 'Courrier', link: '/' },
				{ name: 'Nouvelle prévision de recette EXTERNE', link: '/' },
				{ name: 'Recettes à ordonnancer', link: '/' },
				{ name: 'Encaissements', link: '/' },
				{ name: 'Retard encaissements', link: '/' },
			],
		},
	]

	const menuDataBottom: IMenuContainerProps[] = [
		{
			title: '',
			items: [
				{ name: 'Gestion des échéanciers', link: '/' },
				{ name: 'Gestion des imports de RB', link: '/' },
				{ name: 'Tableau des prévisions', link: '/' },
				{ name: 'États', link: '/' },
				{ name: 'Gestion de TVA', link: '/' },
				{ name: 'Utilitaires', link: '/' },
			],
		},
	]

	return (
		<>
			<Header props={{ pageURL: 'G_IVOO | Tresorerie' }} />
			<main id={'tresorerieMenu'}>
				<div className={'menuWrapper'}>
					<MenuContainer menuData={menuData} />
					<button type={'button'} onClick={(): void => navigate('/menu_general')}>
						Équilibrages
					</button>
					<MenuContainer menuData={menuDataBottom} />
					<div className={'buttonWrapper'}>
						<Button
							props={{
								style: 'grey',
								text: 'Retour',
								type: 'button',
								onClick: (): void => navigate('/commandes/compta_choix'),
							}}
						/>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

const TresorerieMenuWithAuth: (props: object) => ReactElement | null = withAuth(TresorerieMenu)
export default TresorerieMenuWithAuth
