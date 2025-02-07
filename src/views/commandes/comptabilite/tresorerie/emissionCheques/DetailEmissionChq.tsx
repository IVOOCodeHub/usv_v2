import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import './emissionCheques.scss'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'

const DetailEmissionChq = () => {
	const location = useLocation()
	const { rowData } = location.state || {}

	// State for inputs
	const [bank, setBank] = useState('')
	const [chequeNumber, setChequeNumber] = useState('')
	const [chequeDate, setChequeDate] = useState('')
	const [comment, setComment] = useState('')
	const [status, setStatus] = useState('Chèque à émettre')
	const [pdfUrl, setPdfUrl] = useState<string | null>(null)

	// Handles PDF Upload
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const fileUrl = URL.createObjectURL(event.target.files[0])
			setPdfUrl(fileUrl)
		}
	}

	return (
		<>
			<Header props={{ pageURL: 'GIVOO | TRÉSORERIE | DÉTAIL ÉMISSION CHÈQUE' }} />
			<main id='detailEmissionChq'>
				<section className='detailChq__bottomSection'>
					<h3>Paiement Chèque {rowData?.[0]}</h3>

					<div className='form-grid'>
						<div className='form-group'>
							<label>Date saisie:</label>
							<span>{rowData?.[1]}</span>
						</div>
						<div className='form-group'>
							<label>Société:</label>
							<span>{rowData?.[3]}</span>
						</div>
						<div className='form-group'>
							<label>Tiers:</label>
							<span>{rowData?.[3]}</span>
						</div>
						<div className='form-group'>
							<label>Libellé:</label>
							<span>{rowData?.[5]}</span>
						</div>
						<div className='form-group'>
							<label>Montant:</label>
							<span>{rowData?.[6]}</span>
						</div>
						<div className='form-group'>
							<label>Date ordo:</label>
							<span>{rowData?.[2]}</span>
						</div>
						<div className='form-group'>
							<label>Banque émettrice:</label>
							<select value={bank} onChange={(e) => setBank(e.target.value)}>
								<option value=''>Choisir</option>
								<option value='Banque A'>Banque A</option>
								<option value='Banque B'>Banque B</option>
							</select>
						</div>
						<div className='form-group'>
							<label>N° de chèque:</label>
							<input type='text' value={chequeNumber} onChange={(e) => setChequeNumber(e.target.value)} />
						</div>
						<div className='form-group'>
							<label>Date chèque:</label>
							<input type='date' value={chequeDate} onChange={(e) => setChequeDate(e.target.value)} />
						</div>
						<div className='form-group'>
							<label>Commentaire:</label>
							<textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
						</div>
						<div className='form-group'>
							<label>Statut:</label>
							<select value={status} onChange={(e) => setStatus(e.target.value)}>
								<option value='Chèque à émettre'>Chèque à émettre</option>
								<option value='Chèque émis'>Chèque émis</option>
								<option value='Chèque encaissé'>Chèque encaissé</option>
							</select>
						</div>
					</div>

					<h3>Image du Chèque</h3>
					{pdfUrl ? (
						<iframe src={pdfUrl} width='100%' height='500px'></iframe>
					) : (
						<p>Aucune image de chèque associée.</p>
					)}

					<label className='upload-label'>
						Associer image chèque:
						<input type='file' accept='application/pdf' onChange={handleFileUpload} />
					</label>

					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => window.history.back() }} />
						<Button
							props={{ style: 'blue', text: 'Ok', type: 'button', onClick: () => console.log('Paiement enregistré') }}
						/>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default DetailEmissionChq
