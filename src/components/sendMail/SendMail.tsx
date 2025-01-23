import "./sendMail.scss";

import { trapFocus } from "../../utils/scripts/utils.ts";

import {
  ReactElement,
  useRef,
  RefObject,
  useEffect,
  MutableRefObject,
  Dispatch,
} from "react";
import WithAuth from "../../views/auth/WithAuth";

interface ISendMailProps {
  pieceJointe?: File;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<boolean>;
}

import Button from "../button/Button.tsx";

function SendMail({
  pieceJointe,
  isModalOpen,
  setIsModalOpen,
}: ISendMailProps): ReactElement {
  const sendMailRef: MutableRefObject<HTMLElement | null> =
    useRef<HTMLElement | null>(null);
  const mailFormRef: MutableRefObject<HTMLFormElement | null> =
    useRef<HTMLFormElement | null>(null);
  const fileInputRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  useEffect((): (() => void) | undefined => {
    const handleClickOutside: (event: MouseEvent) => void = (
      event: MouseEvent,
    ): void => {
      event.preventDefault();
      if (
        mailFormRef.current &&
        !mailFormRef.current.contains(event.target as Node)
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
    trapFocus(sendMailRef.current);
  }, []);

  useEffect((): void => {
    if (pieceJointe && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(pieceJointe);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [pieceJointe]);

  return (
    <>
      <section id={"sendMail"} ref={sendMailRef}>
        <form ref={mailFormRef}>
          <h2>Envoyer un mail</h2>
          <div className={"inputWrapper"}>
            <label htmlFor={"emailAddress"}>Adresse email:</label>
            <input type={"email"} id={"emailAddress"} />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"objectName"}>Objet:</label>
            <input type={"text"} id={"objectName"} />
          </div>
          <div className={"inputWrapper fileContainer"}>
            <label htmlFor={"pieceJointe"}>Pièce jointe:</label>
            <input type={"file"} id={"pieceJointe"} ref={fileInputRef} />
            <p>File name.pdf</p>
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"message"}>Message:</label>
            <textarea id={"message"}></textarea>
          </div>
          <div className={"buttonContainer"}>
            <Button
              props={{
                style: "green",
                text: "Envoyer",
                type: "button",
              }}
            />
            <Button
              props={{
                style: "red",
                text: "Annuler",
                type: "button",
                onClick: (): void => setIsModalOpen(false),
              }}
            />
          </div>
        </form>
      </section>
    </>
  );
}

const SendMailWithAuth: (props: ISendMailProps) => ReactElement | null =
  WithAuth(SendMail);
export default SendMailWithAuth;
