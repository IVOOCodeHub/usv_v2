import musicFile1 from '../../assets/musicTestFile.mp3'

import AudioPlayer from '../../components/audioPlayer/AudioPlayer'
import LegendComponent from '../../components/legende/LegendComponent'
import DefinitionComponent from '../../components/definition/DefinitionComponent'

const DemoPage = () => {
	const items = [
		{ label: 'Date pièce', value: '01/01/2024' },
		{ label: 'Société', value: 'OpenAI Inc.' },
		{ label: 'Rubrique', value: null },
		{ label: 'Montant TTC', value: '1234.56 €' },
		{ label: 'Banque règlement', value: undefined },
		{ label: 'Avec TVA', value: 'Oui' },
		{ label: 'Moins de 20% de TVA', value: 'Non' },
		{ label: 'TVA 20%', value: '246.91 €' },
		{ label: 'Date échéance', value: '31/12/2024' },
		{ label: 'Date Ordo.', value: '15/12/2024' },
	]
	return (
		<div className='DemoPage'>
			<LegendComponent />
			<AudioPlayer audioSrc={musicFile1} />
			<DefinitionComponent items={items} />
		</div>
	)
}
export default DemoPage
