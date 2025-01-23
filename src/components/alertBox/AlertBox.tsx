// styles
import "./alertBox.scss";

// utils
import { trapFocus } from "../../utils/scripts/utils.ts";

// types
import { ReactElement, useEffect, useRef, MutableRefObject } from "react";

// components
import Button from "../button/Button";

interface AlertBoxProps {
  message: string;
  setMessage: (msg: string) => void;
}

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
