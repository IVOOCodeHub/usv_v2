// styles
import './tpChoix.scss'

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

function TPChoix(): ReactElement {
	const navigate: NavigateFunction = useNavigate()
	const menuData: IMenuContainerProps[] = [
		{
			title: 'Emissions Titres Paiements',
			items: [
				{ name: 'Emission ODV', link: '/commandes/tresorerie/emissions_odv' },
				{ name: "Validation des émissions d'ODV", link: '/' },
				{ name: 'Emissions chèques', link: '/' },
			],
		},
	]
	return (
		<>
			<Header props={{ pageURL: 'G_IVOO | Tresorerie' }} />
			<main id={'tpChoix'}>
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

const TPChoixWithAuth: (props: object) => ReactElement | null = withAuth(TPChoix)
export default TPChoixWithAuth
