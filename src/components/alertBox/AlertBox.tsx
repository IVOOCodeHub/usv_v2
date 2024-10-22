// styles
import "./alertBox.scss";

// types
import { ReactElement, useEffect, useRef, MutableRefObject } from "react";

// components
import Button from "../button/Button";

interface AlertBoxProps {
  message: string;
  setMessage: (msg: string) => void;
}

const trapFocus = (el: HTMLElement | null) => {
  if (!el) return;

  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const firstFocusableElement = el.querySelectorAll(
    focusableElements,
  )[0] as HTMLElement;
  const focusableContent = el.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[
    focusableContent.length - 1
  ] as HTMLElement;

  const handleKeyDown = (e: KeyboardEvent): void => {
    const isTabPressed: boolean = e.key === "Tab" || e.keyCode === 9;
    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  firstFocusableElement.focus();

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
};

export default function AlertBox({
  message,
  setMessage,
}: AlertBoxProps): ReactElement {
  const alertBoxRef: MutableRefObject<HTMLElement | null> =
    useRef<HTMLElement | null>(null);

  useEffect((): (() => void) | undefined => {
    if (message) {
      return trapFocus(alertBoxRef.current);
    }
  }, [message]);

  return (
    <>
      {message && (
        <section id={"alertBox"} ref={alertBoxRef}>
          <div className={"alertBoxWrapper"}>
            <p>{message}</p>
            <Button
              props={{
                style: "blue",
                text: "Ok",
                type: "button",
                onClick: (): void => setMessage(""),
              }}
            />
          </div>
        </section>
      )}
    </>
  );
}
