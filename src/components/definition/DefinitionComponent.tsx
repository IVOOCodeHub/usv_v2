import "./_DefinitionComponent.scss";
import { FC, ReactNode, ReactElement } from "react";

interface IDefinitionItem {
  label: string;
  value: string | number | ReactNode | undefined | null;
}

interface IDefinitionComponentProps {
  items: IDefinitionItem[];
}

const DefinitionComponent: FC<IDefinitionComponentProps> = ({
  items,
}: IDefinitionComponentProps): ReactElement => {
  return (
    <div className="definition-container">
      <dl className="definition-list" aria-label="Definition list">
        {items.map(
          (item: IDefinitionItem, index: number): ReactElement => (
            <div className="definition-item" key={index}>
              <dt className="definition-label">{item.label} :</dt>
              <dd className="definition-value">{item.value ?? "-"}</dd>
            </div>
          ),
        )}
      </dl>
    </div>
  );
};
export default DefinitionComponent;
