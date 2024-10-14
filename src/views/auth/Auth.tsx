// styles
import "./auth.scss";

// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";
import { IUserCredentials } from "../../utils/types/user.interface.ts";

// hooks | libraries
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../../components_library/src/components/header/Header";
import Form from "../../../../components_library/src/components/form/Form";
import Footer from "../../../../components_library/src/components/footer/Footer";

// context
import { UserContext } from "../../context/UserContext.tsx";

export default function Auth(): ReactElement {
  const { user, getUser } = useContext(UserContext);
  const [userCredentials, setUserCredentials] =
    useState<IUserCredentials | null>(null);
  const navigate: NavigateFunction = useNavigate();

  useEffect((): void => {
    if (!user && userCredentials) {
      getUser(userCredentials);
    } else if (user) {
      navigate("/test");
    }
  }, [user, getUser, userCredentials, navigate]);

  return (
    <>
      <Header
        props={{
          pageURL: "GIVOO | LOGIN",
          helpBtn: true,
        }}
      />
      <main id={"auth"}>
        <div className={"formContainer"}>
          <Form
            props={{
              title: "Authentification",
              inputs: [
                {
                  label: "Identifiant :",
                  key: "matricule",
                  type: "text",
                  placeholder: "ex: 6176",
                },
                {
                  label: "Mot de passe :",
                  key: "password",
                  type: "password",
                  placeholder: "ex: decnic",
                },
              ],
              isWithSubmitButton: true,
              setFormData: setUserCredentials,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
