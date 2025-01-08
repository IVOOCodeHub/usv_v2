// styles
import "./displayCourrierModal.scss";

// hooks | library
import withAuth from "../../views/auth/WithAuth.tsx";
import { Dispatch, ReactElement, useEffect, useRef, useContext } from "react";
import { ICourrier } from "../../utils/types/courrier.interface.ts";


// context
import { FileContext } from "../../context/fileContext/FileContext.tsx";

// custom type
export interface IImgModalProps {
  props: {
    selectedCourrier: ICourrier | string;
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<boolean>;
  };
}

export function DisplayCourrierModal({
  props,
}: Readonly<IImgModalProps>): ReactElement {
  const iFrameRef = useRef<HTMLDivElement | null>(null);
  const { selectedCourrier, isModalOpen, setIsModalOpen } = props;
  const { getFileURL, fileURL } = useContext(FileContext);

  function isICourrier(courrier: unknown): courrier is ICourrier {
    return (
      typeof courrier === "object" &&
      courrier !== null &&
      "nomFichier" in courrier
    );
  }

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

  useEffect((): void => {
    if (typeof selectedCourrier === "string") {
      getFileURL(selectedCourrier).finally()
    }
  }, [])

  return (
    <article id={"displayCourrierModal"}>
      <div ref={iFrameRef} className={"iFrameContainer"}>
        {typeof selectedCourrier === "string" && fileURL && (
          <iframe
            title={"courrier"}
            src={fileURL}
          />
        )}
        {isICourrier(selectedCourrier) && (
          <iframe
            title={"courrier"}
            src={`http://192.168.0.254:8080/usv_prod/courriers/${selectedCourrier.nomFichier}`}
          />
        )}
      </div>
    </article>
  );
}

const DisplayCourrierModalWithAuth: (
  props: Readonly<IImgModalProps>,
) => ReactElement | null = withAuth(DisplayCourrierModal);
export default DisplayCourrierModalWithAuth;
