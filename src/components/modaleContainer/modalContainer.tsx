import "./modalContainer.scss";

import { trapFocus } from "../../utils/scripts/utils.ts";

import {
  ReactElement,
  useEffect,
  useRef,
  MutableRefObject,
  Dispatch,
} from "react";
interface IReactElModalContainerProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<boolean>;
  reactElement: ReactElement;
}

export default function ModalContainer({
  isModalOpen,
  setIsModalOpen,
  reactElement,
}: IReactElModalContainerProps): ReactElement {
  // noinspection DuplicatedCode
  const modalRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const reactElModalRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        reactElModalRef.current &&
        !reactElModalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  useEffect((): void => {
    trapFocus(modalRef.current);
  }, []);

  return (
    <>
      <section id={"reactElModal"} ref={modalRef}>
        <div className={"reactElModalContainer"} ref={reactElModalRef}>
          {reactElement}
        </div>
      </section>
    </>
  );
}
