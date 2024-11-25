// styles
import "./form.scss";

// types
interface IFormProps<T> {
  props: {
    title: string;
    input?: {
      label: string;
      key: string;
      type: string;
      required: boolean;
      checked?: boolean;
      placeholder?: string;
    };
    inputs?: {
      label: string;
      key: string;
      type: string;
      required: boolean;
      checked?: boolean;
      placeholder?: string;
      selectProps?: SelectProps;
    }[];
    isWithSelectGroup?: boolean;
    isWithSubmitButton?: boolean;
    submitButtonText?: string;
    isWithCancelButton?: boolean;
    formData?: T;
    setFormData?: Dispatch<SetStateAction<T>>;
    errorMessage?: string;
    onSubmitCallback?: (formData: T) => void;
    onCancelCallback?: () => void;
  };
}

// hooks | libraries
import {
  useState,
  useEffect,
  ReactElement,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

// components
import Select, { Props as SelectProps } from "react-select";
import Button from "../button/Button";

export default function Form<T>({
  props,
}: Readonly<IFormProps<T>>): ReactElement {
  const {
    title,
    input,
    inputs,
    isWithSubmitButton,
    submitButtonText,
    isWithCancelButton,
    setFormData,
    errorMessage,
    onSubmitCallback,
    onCancelCallback,
  } = props;

  const [localFormData, setLocalFormData] = useState<T>({} as T);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const isMultipleClass: string = inputs ? "form--multiple" : "form--single";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [id]: value as unknown as T[keyof T],
    }));
  };

  const checkRequiredFields = (): boolean | undefined => {
    if (input && input.required && !localFormData[input.key as keyof T]) {
      return false;
    }
    if (inputs) {
      return inputs.every(
        (inputItem) =>
          !inputItem.required || !!localFormData[inputItem.key as keyof T],
      );
    }
    return true;
  };

  useEffect(() => {
    setIsSubmitDisabled(!checkRequiredFields());
  }, [localFormData]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (setFormData) setFormData(localFormData);
    if (onSubmitCallback) onSubmitCallback(localFormData);
  };

  const handleCancel = (): void => {
    if (onCancelCallback) onCancelCallback();
  };

  return (
    <form id="form" className={isMultipleClass} onSubmit={handleSubmit}>
      <h3>{title}</h3>
      {input && (
        <div className="inputWrapper">
          <label htmlFor={input.key}>{input.label}</label>
          <input
            type={input.type}
            id={input.key}
            required={input.required}
            placeholder={input.placeholder}
            checked={input.checked}
            onChange={handleInputChange}
          />
        </div>
      )}
      {inputs && (
        <>
          {inputs.map(
            (input): ReactElement => (
              <div className="inputWrapper" key={input.key}>
                <label htmlFor={input.key}>{input.label}</label>

                {input.type === "select" && input.selectProps ? (
                  <Select
                    {...input.selectProps}
                    // styles={customStyles}
                  />
                ) : (
                  <input
                    type={input.type}
                    id={input.key}
                    required={input.required}
                    placeholder={input.placeholder}
                    checked={input.checked}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ),
          )}
        </>
      )}
      {isWithSubmitButton && (
        <div className="buttonWrapper">
          <Button
            props={{
              style: "blue",
              text: submitButtonText,
              type: "submit",
              disabled: isSubmitDisabled,
            }}
          />
          {isWithCancelButton && (
            <Button
              props={{
                style: "grey",
                text: "Annuler",
                type: "button",
                onClick: handleCancel,
              }}
            />
          )}
        </div>
      )}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </form>
  );
}
