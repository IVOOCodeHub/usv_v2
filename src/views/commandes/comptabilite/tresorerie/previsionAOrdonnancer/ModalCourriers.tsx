import React, { useEffect, useState } from 'react'
import Header from '../../../../../components/header/Header.tsx'
import NRTL from '../../../../../components/NRTL/NRTL'
import { getCourrierDepensesService } from '../../../../../API/services/Courrier.service.ts'
import { IUserCredentials } from '../../../../../utils/types/user.interface.ts'

interface ModalCourriersProps {
	isOpen: boolean
	onClose: () => void
	userCredentials: IUserCredentials
	previsionCode: string // Code de la prévision passé en paramètre
}

const ModalCourriers: React.FC<ModalCourriersProps> = ({ isOpen, onClose, userCredentials, previsionCode }) => {
	const [courriers, setCourriers] = useState<string[][]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('no-scroll')
			const fetchCourriers = async () => {
				setIsLoading(true)
				// const response = await getCourrierTiersPrevisionService(userCredentials)
				const response = await getCourrierDepensesService(userCredentials)
				if (typeof response === 'string') {
					console.error('Erreur lors de la récupération des courriers :', response)
				} else {
					setCourriers(
						response.map((courrier) => [
							courrier.index,
							courrier.dhSaisie,
							courrier.societeEmettrice,
							courrier.nature,
							courrier.commentaire,
						])
					)
				}
				setIsLoading(false)
			}

			fetchCourriers()
		}
		return () => {
			document.body.classList.remove('no-scroll') // Suppression de la classe au démontage
		}
	}, [isOpen, userCredentials])

	if (!isOpen) return null

	const tableData = {
		tableHead: ['Clé', 'Date réception', 'Émetteur', 'Nature', 'Commentaire'],
		tableBody: courriers,
	}

	const handleRowClick = (index: number, rowData: string[] | undefined) => {
		console.log('Row clicked:', rowData, 'Prevision Code:', previsionCode)
		// Logique future pour associer un courrier à la prévision
	}

	return (
		<div className='modal'>
			<div className='modalContent'>
				{isLoading ? (
					<p>Chargement...</p>
				) : (
					<>
						<div className='modal-header'>
							<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | LISTE DES COURRIERS' }} />
							<button className='modalCloseButton' onClick={onClose}>
								X
							</button>
						</div>
						<NRTL
							datas={tableData}
							headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
							headerHoverBackgroundColor='#1092B8'
							showItemsPerPageSelector={true}
							showPreviousNextButtons={true}
							showSearchBar={true}
							filterableColumns={[false, false, true, true, true, true, false]}
							showPagination={true}
							enableColumnSorting={true}
							itemsPerPageOptions={[10, 25, 50]}
							onRowClick={handleRowClick}
							language='fr'
						/>
					</>
				)}
			</div>
		</div>
	)
}

export default ModalCourriers
