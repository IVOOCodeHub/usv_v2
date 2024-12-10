import './_DefinitionComponent.scss'

interface DefinitionItem {
	label: string
	value: string | number | React.ReactNode | undefined | null
}

interface DefinitionComponentProps {
	items: DefinitionItem[]
}

const DefinitionComponent: React.FC<DefinitionComponentProps> = ({ items }) => {
	return (
		<div className='definition-container'>
			<dl className='definition-list' aria-label='Definition list'>
				{items.map((item, index) => (
					<div className='definition-item' key={index}>
						<dt className='definition-label'>{item.label} :</dt>
						<dd className='definition-value'>{item.value ?? '-'}</dd>
					</div>
				))}
			</dl>
		</div>
	)
}
export default DefinitionComponent
