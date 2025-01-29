// types
import { ReactElement } from "react";
import { IMenuContainerProps } from "./MenuContainer";
import { IMenuItem } from "./MenuItem";

// components
import MenuItem from "./MenuItem";

export default function MenuSection({
  title,
  items,
  isCheckable,
}: IMenuContainerProps): ReactElement {
  return (
    <ul id={"menuSection"}>
      <h2>{title}</h2>
      {items.map(
        (item: IMenuItem, index: number): ReactElement => (
          <MenuItem
            key={index}
            name={item.name}
            link={item.link}
            isMigrated={item.isMigrated}
            isCheckable={isCheckable}
          />
        ),
      )}
    </ul>
  );
}
