// types
import { ReactElement } from "react";
export interface IMenuItem {
  name: string;
  link: string;
  isMigrated?: boolean;
  isCheckable?: boolean;
}

// hooks | library
import { useState } from "react";
import { Link } from "react-router-dom";
import MigrationStatus from "../migrationStatus/MigrationStatus.tsx";

export default function MenuItem({
  name,
  link,
  isMigrated,
  isCheckable,
}: {
  name: IMenuItem["name"];
  link: IMenuItem["link"];
  isMigrated?: IMenuItem["isMigrated"];
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
          <span className={"menuItemWithCheckbox"}>{name}</span>
        </>
      ) : (
        <Link to={link}>
          <li className={"menuItem"}>{name}</li>
        </Link>
      )}
      <MigrationStatus isMigrationDone={isMigrated} />
    </div>
  );
}
