import "./migrationStatus.scss";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

import { ReactElement } from "react";

interface IMigrationStatusProps {
  isMigrationDone: boolean | undefined;
}

export default function MigrationStatus({
  isMigrationDone,
}: IMigrationStatusProps): ReactElement {
  return (
    <div id={"migrationStatus"}>
      {isMigrationDone ? <FaCircleCheck fill={'#008000FF'} /> : <FaCircleXmark fill={'#B10303FF'}  />}
    </div>
  );
}
