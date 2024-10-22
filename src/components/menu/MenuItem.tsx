// types
import { ReactElement } from "react";
import { IMenuItem } from "./MenuContainer";

// hooks | library
import { Link } from "react-router-dom";

export default function MenuItem({
  name,
  link,
}: {
  name: IMenuItem["name"];
  link: IMenuItem["link"];
}): ReactElement {
  return (
    <Link to={link}>
      <li id={"menuItem"}>{name}</li>
    </Link>
  );
}
