// styles
import "./menuContainer.scss";

// types
import { ReactElement } from "react";
export interface IMenuContainerProps {
  title: string;
  items: IMenuItem[];
}

export interface IMenuItem {
  name: string;
  link: string;
}

// components
import MenuSection from "./MenuSection";

export default function MenuContainer({
  menuData,
}: {
  menuData: IMenuContainerProps[];
}): ReactElement {
  return (
    <section id={"menuContainer"}>
      {menuData.map(
        (section: IMenuContainerProps, index: number): ReactElement => (
          <MenuSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ),
      )}
    </section>
  );
}
