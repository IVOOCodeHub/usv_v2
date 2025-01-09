// styles
import "./displayCourrierModal.scss";

// hooks | library
import withAuth from "../../views/auth/WithAuth.tsx";
import { Dispatch, ReactElement, useEffect, useRef, useContext } from "react";
import { ICourrier } from "../../utils/types/courrier.interface.ts";
import { useLocation } from "react-router-dom";

// components
import Button from "../button/Button.tsx";

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
  const { pathname } = useLocation();
  const isNewCourrier: boolean = pathname.includes(
    "/gestion_des_courriers/nouveaux_courriers",
  );

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

  useEffect((): (() => void) | undefined => {
    if (!isNewCourrier) {
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
    }
  }, [isModalOpen]);

  useEffect((): void => {
    if (typeof selectedCourrier === "string") {
      getFileURL(selectedCourrier).finally();
    }
  }, []);

  return (
    <article id={"displayCourrierModal"}>
      <div ref={iFrameRef} className={"iFrameContainer"}>
        {typeof selectedCourrier === "string" && fileURL && (
          <iframe title={"courrier"} src={fileURL} />
        )}
        {isICourrier(selectedCourrier) && (
          <iframe
            title={"courrier"}
            src={`http://192.168.0.254:8080/usv_prod/courriers/${selectedCourrier.nomFichier}`}
          />
        )}
      </div>
      {isNewCourrier && (
        <div className={"NewCourrierActions"}>
          <div className={"buttonContainer"}>
            <Button
              props={{ style: "blue", text: "Courrier reçu", type: "button" }}
            />
            <Button
              props={{
                style: "blue",
                text: "Courrier interne",
                type: "button",
              }}
            />
            <Button
              props={{ style: "blue", text: "Courrier envoyé", type: "button" }}
            />
            <Button
              props={{ style: "red", text: "Supprimer", type: "button" }}
            />
            <Button
              props={{
                style: "grey",
                text: "Retour à la liste des courriers",
                type: "button",
                onClick: (): void => {
                  setIsModalOpen(false);
                },
              }}
            />
          </div>
        </div>
      )}
    </article>
  );
}

const DisplayCourrierModalWithAuth: (
  props: Readonly<IImgModalProps>,
) => ReactElement | null = withAuth(DisplayCourrierModal);
export default DisplayCourrierModalWithAuth;
