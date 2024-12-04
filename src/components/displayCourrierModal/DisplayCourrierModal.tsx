// styles
import "./displayCourrierModal.scss";

// hooks | library
import withAuth from "../../views/auth/withAuth.tsx";
import { Dispatch, ReactElement, useEffect, useRef } from "react";
import { ICourrier } from "../../utils/types/courrier.interface.ts";

// custom type
export interface IImgModalProps {
  props: {
    selectedCourrier: ICourrier;
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<boolean>;
  };
}

export function DisplayCourrierModal({ props }: Readonly<IImgModalProps>): ReactElement {
  const iFrameRef = useRef<HTMLDivElement | null>(null);
  const { selectedCourrier, isModalOpen, setIsModalOpen } = props;

  useEffect((): (() => void) => {
    const handleClickOutside: (event: MouseEvent) => void = (
      event: MouseEvent,
    ): void => {
      event.preventDefault();
      if (
        iFrameRef.current &&
        !iFrameRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <article id={"displayCourrierModal"}>
      <div ref={iFrameRef} className={"iFrameContainer"}>
        <iframe
          title={"courrier"}
          src={`http://192.168.0.254:8080/usv_prod/courriers/${selectedCourrier.nomFichier}`}
        />
      </div>
    </article>
  );
}

const DisplayCourrierModalWithAuth: (
  props: Readonly<IImgModalProps>,
) => ReactElement | null = withAuth(DisplayCourrierModal);
export default DisplayCourrierModalWithAuth;
