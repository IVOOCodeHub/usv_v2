import "./CommandesFournisseursMenu.scss";
import { ReactElement } from "react";

import { useNavigate, NavigateFunction } from "react-router-dom";

import WithAuth from "../../auth/WithAuth.tsx";
import Header from "../../../components/header/Header.tsx";
import MenuContainer, {
    IMenuContainerProps,
} from "../../../components/menu/MenuContainer";
import Button from "../../../components/button/Button.tsx";
import Footer from "../../../components/footer/Footer.tsx";

const CommandesFournisseursMenu = (): ReactElement => {
    const navigate: NavigateFunction = useNavigate();

    const menuData: IMenuContainerProps[] = [
        {
            title: "Commandes fournisseurs",
            items: [
                {
                    name: "Création Commandes",
                    link: "/commandes/commandes_fournisseurs/creation_commandes",
                    isMigrated: true,
                },
                {
                    name: "Commandes à Valider",
                    link: "/commandes/commandes_fournisseurs/commandes_a_valider",
                    isMigrated: true,
                },
                {
                    name: "Réception Commandes",
                    link: "/commandes/commandes_fournisseurs/reception_commandes",
                    isMigrated: true,
                },
                {
                    name: "Utilitaires",
                    link: "/commandes/commandes_fournisseurs/utilitaire_commandes",
                    isMigrated: true,
                },
                {
                    name: "États",
                    link: "/commandes/commandes_fournisseurs/etat",
                    isMigrated: true,
                }
            ]
        }
    ];
    return (
        <>
            <Header
                props={{
                    pageURL: "G_IVOO | COMMANDES FOURNISSEURS",
                    helpBtn: false,
                }}
            />
            <main id={"commandesFournisseurs"}>
                <nav className={"commandes_fournisseurs_menuWrapper"}>
                    <MenuContainer menuData={menuData} />
                </nav>
                <div className={"goBackBtnWrapper"}>
                    <Button
                        props={{
                            style: "grey",
                            text: "Retour",
                            type: "button",
                            onClick: (): void => navigate("/menu_general"),
                        }}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
};

const CommandesFournisseursMenuWithAuth: (
    props: object,
) => ReactElement | null = WithAuth(CommandesFournisseursMenu);
export default CommandesFournisseursMenuWithAuth;

