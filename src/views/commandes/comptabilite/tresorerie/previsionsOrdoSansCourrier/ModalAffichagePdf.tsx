import './ModalAffichagePdf.scss'

interface ModalAffichagePdfProps {
	isOpen: boolean // Controls whether the modal is open
	onClose: () => void // Function to close the modal
	pdfUrl: string // URL of the PDF to display
	onAssocier: () => void // Function to handle the "Associer" button click
}

const ModalAffichagePdf: React.FC<ModalAffichagePdfProps> = ({ isOpen, onClose, pdfUrl, onAssocier }) => {
	if (!isOpen) return null

	return (
		<div className='modal'>
			<div className='modalContent'>
				<div className='modal-header'>
					<div className='modalButtons'>
						<button className='associerButton' onClick={onAssocier}>
							Associer
						</button>
						<button className='annulerButton' onClick={onClose}>
							Annuler
						</button>
					</div>
				</div>
				<div className='pdfViewer'>
					<iframe src={pdfUrl} title='PDF Viewer' width='100%' height='800px' />
				</div>
			</div>
		</div>
	)
}

export default ModalAffichagePdf
