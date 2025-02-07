import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import './emissionCheques.scss'
import Header from '../../../../../components/header/Header'
import Button from '../../../../../components/button/Button.tsx'
import Footer from '../../../../../components/footer/Footer'

const DetailEmissionChq = () => {
	const location = useLocation()
	const { rowData } = location.state || {}
	const [pdfUrl, setPdfUrl] = useState<string | null>(null)

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
					<h3>Détails du Chèque</h3>
					<p>
						<strong>Fournisseur:</strong> {rowData[3]}
					</p>
					<p>
						<strong>Libellé:</strong> {rowData[5]}
					</p>
					<p>
						<strong>Montant:</strong> {rowData[6]}
					</p>

					<h3>Image du Chèque</h3>
					{pdfUrl ? (
						<iframe src={pdfUrl} width='100%' height='500px'></iframe>
					) : (
						<p>Aucune image de chèque associée.</p>
					)}

					<input type='file' accept='application/pdf' onChange={handleFileUpload} />
					<div className='greyButtonWrapper'>
						<Button props={{ style: 'grey', text: 'Retour', type: 'button', onClick: () => window.history.back() }} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default DetailEmissionChq
