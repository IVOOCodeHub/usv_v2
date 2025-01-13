import React from 'react'
import './ConfirmationModal.scss' // Optional: Add styles for the modal

interface ConfirmationModalProps {
	message: string
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<p>{message}</p>
				<div className='modal-buttons'>
					<button className='modal-button confirm' onClick={onConfirm}>
						Oui
					</button>
					<button className='modal-button cancel' onClick={onCancel}>
						Non
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmationModal
