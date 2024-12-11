// styles
import './selectGroup.scss'

// hooks | libraries
import { ReactElement } from 'react'
import Select, { Props as SelectProps, SingleValue } from 'react-select'

// custom types
interface Option {
	value: string
	label: string
}

interface ISelectGroupProps {
	props: {
		selectProps?: SelectProps<Option, false> // Définir le type des options
		optionsData: {
			libelle: string
			options: Option[]
		}[]
		onChange?: (selectedOption: SingleValue<Option>, group: string) => void // Ajout du type correct pour `selectedOption`
	}
}

// export default function SelectGroup({
//   props,
// }: Readonly<ISelectGroupProps>): ReactElement {
//   const { selectProps, optionsData } = props;

//   return (
//     <ul id={"selectGroup"}>
//       {optionsData.map(
//         (data: {
//           libelle: string;
//           options: { value: string; label: string }[];
//         }): ReactElement => (
//           <li key={data.libelle}>
//             <label htmlFor={`select${data.libelle}`}>{data.libelle}</label>
//             {selectProps && (
//               <Select
//                 {...selectProps}
//                 options={data.options}
//                 inputId={`select${data.libelle}`}
//               />
//             )}
//           </li>
//         ),
//       )}
//     </ul>
//   );
// }

export default function SelectGroup({ props }: Readonly<ISelectGroupProps>): ReactElement {
	const { selectProps, optionsData, onChange } = props

	return (
		<ul id='selectGroup'>
			{optionsData.map(
				({ libelle, options }): ReactElement => (
					<li key={libelle}>
						<label htmlFor={`select${libelle}`}>{libelle}</label>
						{selectProps && (
							<Select
								{...selectProps}
								options={options}
								inputId={`select${libelle}`}
								onChange={(selectedOption) => {
									if (onChange) {
										onChange(selectedOption, libelle) // Appelle `onChange` avec le bon type
									}
								}}
							/>
						)}
					</li>
				)
			)}
		</ul>
	)
}
