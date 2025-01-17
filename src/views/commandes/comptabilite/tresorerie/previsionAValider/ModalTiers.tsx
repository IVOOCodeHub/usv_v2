import React from 'react'
import Header from '../../../../../components/header/Header.tsx'
import Nrtl from '../../../../../components/NRTL/NRTL'
import { mockedTiers } from './mock/mockTiers.ts'

// Define the Tiers type
type Tiers = string[]

interface ModalTiersProps {
	isOpen: boolean
	onClose: () => void
	onSelectTiers: (tiers: { code: string; intitule: string; rubrique: string }) => void // Callback when a Tiers is selected
}

const ModalTiers: React.FC<ModalTiersProps> = ({ isOpen, onClose, onSelectTiers }) => {
	if (!isOpen) return null

	// Table data structure for NRTL component
	const tableData = {
		tableHead: ['Code', 'Intitulé', 'Rubrique'], // Table headers
		tableBody: mockedTiers, // Mocked Tiers data
	}

	// Handle row click
	const handleRowClick = (_: number, rowData: Tiers | undefined) => {
		if (rowData) {
			const selectedTiers = {
				code: rowData[0], // Code
				intitule: rowData[1], // Intitulé
				rubrique: rowData[2], // Rubrique
			}
			onSelectTiers(selectedTiers)
			onClose()
		}
	}

	return (
		<div className='modal'>
			<div className='modalContent'>
				<div className='modal-header'>
					<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | RECHERCHE DE TIERS' }} />
					<button className='modalCloseButton' onClick={onClose}>
						X
					</button>
				</div>
				<Nrtl
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
					onRowClick={(index, rowData: Tiers | undefined) => handleRowClick(index, rowData)}
					language='fr'
				/>
			</div>
		</div>
	)
}

export default ModalTiers
