// styles
import "./button.scss";

// types
import { ReactElement } from "react";

interface IButtonProps {
  props: {
    style: "blue" | "white" | "grey" | "green" | "red" | "orange";
    text: string | undefined;
    type: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
    onClick?: (
      text?: string,
      url?: string,
    ) => void | ReactElement | Window | null;
  };
}

export default function Button({ props }: Readonly<IButtonProps>): ReactElement | null {
  const { style, text, type, disabled, onClick } = props;

  const handleClick: () => void = (): void => {
    if (onClick) onClick(text);
  };

  const className = `${style}Button`;

  return (
    <button
      className={className}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
