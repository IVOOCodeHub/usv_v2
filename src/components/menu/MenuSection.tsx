// types
import { ReactElement } from "react";
import { IMenuContainerProps, IMenuItem } from "./MenuContainer";

// components
import MenuItem from "./MenuItem";

export default function MenuSection({
  title,
  items,
}: IMenuContainerProps): ReactElement {
  return (
    <ul id={"menuSection"}>
      <h2>{title}</h2>
      {items.map(
        (item: IMenuItem, index: number): ReactElement => (
          <MenuItem key={index} name={item.name} link={item.link} />
        ),
      )}
    </ul>
  );
}
