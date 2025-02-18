// styles
import "./formulaireProjet.scss";

import {ReactElement, useState} from "react";
import Select from "react-select";


const FormulaireProjet = ():ReactElement => {
    const [theme, setTheme] = useState("");
    const [nomProjet, setNomProjet] = useState("");
    const [description, setDescription] = useState("");
    const [commentaire, setCommentaire] = useState("");
    const [priorite, setPriorite] = useState(0);

    const optionsTheme = [
        { value: "1", label: "Aménagement" },
        { value: "2", label: "Bases de données" },
        { value: "3", label: "Informatique" },
    ];

    const optionsPriorite = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

    return (
        <form className={"formAjoutProjet"}>
            <div className={"formWrapper"}>
                <div className={"inputWrapper"}>
                    <label htmlFor={"theme"}>Thème :</label>
                    <Select
                        id={"theme"}
                        options={optionsTheme}
                        value={optionsTheme.find(option => option.value === theme) || null}
                        onChange={(selectedOption) => setTheme(selectedOption?.value || "")}
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor={"nom_projet"}>Nom du projet :</label>
                    <input
                        type={"text"}
                        id={"nom_projet"}
                        value={nomProjet}
                        onChange={(e) => setNomProjet(e.target.value)}
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor={"description"}>Description :</label>
                    <textarea
                        id={"description"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor={"commentaire"}>Commentaire :</label>
                    <textarea
                        id={"commentaire"}
                        value={commentaire}
                        onChange={(e) => setCommentaire(e.target.value)}
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor={"priorite"}>Priorité :</label>
                    <Select
                        id={"priorite"}
                        options={optionsPriorite}
                        value={optionsPriorite.find(option => option.value === priorite) || null}
                        onChange={(selectedOption) => setPriorite(selectedOption?.value || 0)}
                    />
                </div>
            </div>
        </form>
    );
};

export default FormulaireProjet;
