// types
import { ReactElement } from "react";
export interface IMenuItem {
  name: string;
  link: string;
  isCheckable?: boolean;
}

// hooks | library
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuItem({
  name,
  link,
  isCheckable,
}: {
  name: IMenuItem["name"];
  link: IMenuItem["link"];
  isCheckable?: IMenuItem["isCheckable"];
}): ReactElement {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange: () => void = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <div id={"menuItemContainer"}>
      {isCheckable ? (
        <>
          <input
            type={"checkbox"}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className={"menuItemWithCheckbox"}>
            {name}
          </span>
        </>
      ) : (
        <Link to={link}>
          <li className={"menuItem"}>{name}</li>
        </Link>
      )}
    </div>
  );
}
