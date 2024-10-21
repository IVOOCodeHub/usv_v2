// types
import { ReactElement } from "react";
import { IMenuItem } from "./MenuContainer";

export default function MenuItem({
  name,
}: {
  name: IMenuItem["name"];
}): ReactElement {
  return (
    <li id={"menuItem"}>
      <a>{name}</a>
    </li>
  );
}
