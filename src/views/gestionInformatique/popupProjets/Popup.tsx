// styles
import "./popup.scss";

import React, {ReactElement} from "react";
import Button from "../../../components/button/Button";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    content: ReactElement;
    buttons?: {
        style: "green" | "orange" | "blue" | "white" | "grey" | "red";
        type: "submit" | "reset" | "button" | undefined;
        title: string;
        onClick?: () => void }[] | undefined;
}
//

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, buttons, content }) => {
    if (!isOpen) return null;

    return (
        <div className="popupOverlay" id="updateServiceModal">
                <div className="popupContent">
                    {title && <h2>{title}</h2>}

                    <div className="popupBody">{content}</div>
                    <div className={"buttonContainer"}>

                        {buttons && buttons.map((button, index) => (
                            <Button
                                key={index}
                                props={{
                                    style: button.style,
                                    text: button.title,
                                    type: button.type,
                                    onClick: button.onClick || (() => {}),
                                }}
                            />
                        ))}

                        <Button
                            props={{
                                style: "grey",
                                text: "Annuler",
                                type: "button",
                                onClick: onClose,
                            }}
                        />
                    </div>
                </div>
            {/*</form>*/}
        </div>
    );
};

export default Popup;
