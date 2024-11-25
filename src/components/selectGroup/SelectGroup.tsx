// styles
import "./selectGroup.scss";

// hooks | libraries
import { ReactElement } from "react";
import Select, { Props as SelectProps } from "react-select";

// custom types
interface ISelectGroupProps {
  props: {
    selectProps?: SelectProps;
    optionsData: {
      libelle: string;
      options: { value: string; label: string }[];
    }[];
  };
}

export default function SelectGroup({
  props,
}: Readonly<ISelectGroupProps>): ReactElement {
  const { selectProps, optionsData } = props;

  return (
    <ul id={"selectGroup"}>
      {optionsData.map(
        (data: {
          libelle: string;
          options: { value: string; label: string }[];
        }): ReactElement => (
          <li key={data.libelle}>
            <label htmlFor={`select${data.libelle}`}>{data.libelle}</label>
            {selectProps && (
              <Select
                {...selectProps}
                options={data.options}
                inputId={`select${data.libelle}`}
              />
            )}
          </li>
        ),
      )}
    </ul>
  );
}
