// styles
import "./menuContainer.scss";

// types
import { ReactElement } from "react";
import { IMenuItem } from "./MenuItem.tsx";
export interface IMenuContainerProps {
  title: string;
  items: IMenuItem[];
  isCheckable?: boolean;
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
            isCheckable={section.isCheckable}
          />
        ),
      )}
    </section>
  );
}
