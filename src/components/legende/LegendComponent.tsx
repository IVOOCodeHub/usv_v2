// Mocking des données pour la légende (noms des cas séparés par des points-virgules)
const mockedData = 'Cas 1;Cas 2;Cas 3;Cas 4;Cas 5'

// Transformation des données en un tableau d'objets avec une couleur aléatoire
const mockedCases = mockedData.split(';').map((name) => ({
	name: name.trim(),
	color: getRandomColor(),
}))

// Fonction pour générer une couleur aléatoire
function getRandomColor() {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

// Composant LegendComponent
const LegendComponent = () => {
	return (
		<div className='Legend'>
			<div className='Legend__container'>
				<div className='Legend__header'>Légende</div>
				<ul className='Legend__list'>
					{mockedCases.map((cas) => (
						<li key={cas.name} className='Legend__item'>
							<span className='Legend__color-dot' style={{ backgroundColor: cas.color }}></span>
							{cas.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default LegendComponent
