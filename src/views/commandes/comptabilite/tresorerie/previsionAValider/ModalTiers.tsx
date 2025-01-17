import React, { useCallback } from 'react'
import Header from '../../../../../components/header/Header.tsx'
import NRTL from '../../../../../components/NRTL/NRTL'

interface ModalTiersProps {
	isOpen: boolean
	onClose: () => void
	onSelectTiers: (tiers: { code: string; intitule: string; rubrique: string }) => void // Callback when a Tiers is selected
}

const ModalTiers: React.FC<ModalTiersProps> = ({ isOpen, onClose, onSelectTiers }) => {
	if (!isOpen) return null
	// Mocked data for Tiers with 3 columns: Code, Intitulé, Rubrique
	const mockedTiers = [
		['T001', 'IONOS', 'Rubrique A'],
		['T002', 'Société A', 'Rubrique B'],
		['T003', 'Entreprise B', 'Rubrique C'],
		['T004', 'Compagnie C', 'Rubrique D'],
		['T005', 'Organisation D', 'Rubrique E'],
		['T006', 'Société E', 'Rubrique F'],
		['T007', 'Entreprise F', 'Rubrique G'],
		['T008', 'Compagnie G', 'Rubrique H'],
		['T009', 'Organisation H', 'Rubrique I'],
		['T010', 'Société I', 'Rubrique J'],
		['T011', 'Entreprise J', 'Rubrique K'],
		['T012', 'Compagnie K', 'Rubrique L'],
		['T013', 'Organisation L', 'Rubrique M'],
		['T014', 'Société M', 'Rubrique N'],
		['T015', 'Entreprise N', 'Rubrique O'],
		['T016', 'Compagnie O', 'Rubrique P'],
		['T017', 'Organisation P', 'Rubrique Q'],
		['T018', 'Société Q', 'Rubrique R'],
		['T019', 'Entreprise R', 'Rubrique S'],
		['T020', 'Compagnie S', 'Rubrique T'],
		['T021', 'Organisation T', 'Rubrique U'],
		['T022', 'Société U', 'Rubrique V'],
		['T023', 'Entreprise V', 'Rubrique W'],
		['T024', 'Compagnie W', 'Rubrique X'],
		['T025', 'Organisation X', 'Rubrique Y'],
	]

	// Table data structure for NRTL component
	const tableData = {
		tableHead: ['Code', 'Intitulé', 'Rubrique'], // Table headers
		tableBody: mockedTiers, // Mocked Tiers data
	}

	// Handle row click
	const handleRowClick = (index: number, rowData: string[] | undefined) => {
		console.log('Row clicked:', index, rowData) // Debug log
		if (rowData) {
			const selectedTiers = {
				code: rowData[0], // Code
				intitule: rowData[1], // Intitulé
				rubrique: rowData[2], // Rubrique
			}
			console.log('Selected tiers:', selectedTiers) // Debug log
			onSelectTiers(selectedTiers)
			console.log('Calling onClose') // Debug log
			onClose() // Ensure this is called
		}
	}

	if (!isOpen) return null

	return (
		<div className='modal'>
			<div className='modalContent'>
				<div className='modal-header'>
					<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | RECHERCHE DE TIERS' }} />
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
					filterableColumns={[true, true, true]} // Allow filtering on all columns
					showPagination={true}
					enableColumnSorting={true}
					itemsPerPageOptions={[10, 25, 50]}
					onRowClick={(index, rowData) => handleRowClick(index, rowData)}
					language='fr'
				/>
			</div>
		</div>
	)
}

export default ModalTiers
