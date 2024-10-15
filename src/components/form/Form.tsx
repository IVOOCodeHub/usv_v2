// styles
import "./form.scss";

// types
import {
  ReactElement,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
interface IFormProps<T> {
  props: {
    title: string;
    input?: {
      label: string;
      key: string;
      type: string;
      required: boolean;
      placeholder?: string;
    };
    inputs?: {
      label: string;
      key: string;
      type: string;
      required: boolean;
      placeholder?: string;
    }[];
    isWithSubmitButton?: boolean;
    formData?: T;
    setFormData?: Dispatch<SetStateAction<T>>;
    errorMessage?: string;
  };
}

// hooks | libraries
import { useState, useEffect } from "react";

// components
import Button from "../button/Button";

export default function Form<T>({ props }: IFormProps<T>): ReactElement {
  const {
    title,
    input,
    inputs,
    isWithSubmitButton,
    setFormData,
    errorMessage,
  } = props;
  const [localFormData, setLocalFormData] = useState<T>({} as T);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const isMultipleClass: string = inputs ? "form--multiple" : "form--single";

  const handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { id, value } = e.target;
    setLocalFormData(
      (prevData: T): T => ({
        ...prevData,
        [id]: value as unknown as T[keyof T],
      }),
    );
  };

  const checkRequiredFields: () => boolean | undefined = ():
    | boolean
    | undefined => {
    // case only one input required
    if (input && input.required && !localFormData[input.key as keyof T]) {
      return false;
    }
    // case multiple input required
    if (inputs) {
      return inputs.every(
        (inputItem: {
          label: string;
          key: string;
          type: string;
          required: boolean;
          placeholder?: string;
        }): boolean =>
          !inputItem.required || !!localFormData[inputItem.key as keyof T],
      );
    }
    return true;
  };

  useEffect((): void => {
    setIsSubmitDisabled(!checkRequiredFields());
  }, [localFormData]);

  const handleSubmit: (e: FormEvent) => void = (e: FormEvent): void => {
    e.preventDefault();
    if (setFormData) setFormData!(localFormData);
  };

  return (
    <form id={"form"} className={isMultipleClass} onSubmit={handleSubmit}>
      <h3>{title}</h3>
      {input && (
        <div className={"inputWrapper"}>
          <label htmlFor={input.key}>{input.label}</label>
          <input
            type={input.type}
            id={input.key}
            required={input.required}
            placeholder={input.placeholder}
            onChange={handleInputChange}
          />
        </div>
      )}
      {inputs && (
        <>
          {inputs.map(
            (
              input: {
                label: string;
                key: string;
                type: string;
                required: boolean;
                placeholder?: string;
              },
              index: number,
            ): ReactElement => (
              <div className={"inputWrapper"} key={index}>
                <label htmlFor={input.key}>{input.label}</label>
                <input
                  type={input.type}
                  id={input.key}
                  required={input.required}
                  placeholder={input.placeholder}
                  onChange={handleInputChange}
                />
              </div>
            ),
          )}
        </>
      )}
      {isWithSubmitButton && (
        <div className={"buttonWrapper"}>
          <Button
            props={{
              style: "blue",
              text: "Connexion",
              type: "submit",
              disabled: isSubmitDisabled,
            }}
          />
        </div>
      )}
      {errorMessage && <p className={"errorMessage"}>{errorMessage}</p>}
    </form>
  );
}
