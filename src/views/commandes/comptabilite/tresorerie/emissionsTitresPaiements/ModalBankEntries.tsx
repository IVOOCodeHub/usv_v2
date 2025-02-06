import React from 'react'
import Header from '../../../../../components/header/Header.tsx'
import Nrtl from '../../../../../components/NRTL/NRTL'
import Button from '../../../../../components/button/Button.tsx'
import { mockedBankEntries } from './mock/mockBankEntries.ts' // Mocked bank entries data
import './modalBankEntries.scss'

// Define the BankEntry type
type BankEntry = [string, string, string, string]

interface ModalBankEntriesProps {
	isOpen: boolean
	onClose: () => void
	onSelectBankEntry: (bankEntry: { code: string; date: string; libelle: string; debit: string }) => void
	libelleTiers: string
	libelleEcriture: string
}

const ModalBankEntries: React.FC<ModalBankEntriesProps> = ({
	isOpen,
	onClose,
	onSelectBankEntry,
	libelleTiers,
	libelleEcriture,
}) => {
	if (!isOpen) return null

	// Table data structure for NRTL component
	const tableData = {
		tableHead: ['Code', 'Date', 'Libellé', 'Débit'], // Table headers
		tableBody: mockedBankEntries, // Mocked bank entries data
	}

	// Handle row click
	const handleRowClick = (_: number, rowData: BankEntry | undefined) => {
		if (rowData) {
			const selectedBankEntry = {
				code: rowData[0],
				date: rowData[1],
				libelle: rowData[2],
				debit: rowData[3],
			}
			onSelectBankEntry(selectedBankEntry)
			onClose()
		}
	}

	return (
		<div className='modal'>
			<div className='modalContent'>
				<div className='modal-header'>
					<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | ASSOCIATION LIGNE DE RELEVÉ BANCAIRE' }} />
				</div>
				<div className='selected-bank-entry-description'>
					<h3>
						{libelleEcriture} - {libelleTiers}
					</h3>
				</div>
				<Nrtl
					datas={tableData}
					headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
					headerHoverBackgroundColor='#1092B8'
					showItemsPerPageSelector={true}
					showPreviousNextButtons={true}
					showSearchBar={true}
					filterableColumns={[false, true, false, false]} // Allow filtering on all columns except the first two
					showPagination={true}
					enableColumnSorting={true}
					itemsPerPageOptions={[10, 25, 50]}
					onRowClick={(index: number, rowData?: string[]) => handleRowClick(index, rowData as BankEntry)}
					language='fr'
				/>
				<div className='buttons-container'>
					<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: onClose }} />
				</div>
			</div>
		</div>
	)
}

export default ModalBankEntries
