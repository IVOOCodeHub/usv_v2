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
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import Form from "../../components/form/Form";
import Footer from "../../components/footer/Footer";

// context
import { LoaderContext } from "../../context/LoaderContext.tsx";
import { UserContext } from "../../context/UserContext.tsx";

export default function Auth(): ReactElement {
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const { user, getUser, credentialsErrorMessage, setCredentialsErrorMessage } =
    useContext(UserContext);
  const [userCredentials, setUserCredentials] =
    useState<IUserCredentials | null>(null);
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit: (
    userCredentials: IUserCredentials,
  ) => Promise<void> = async (
    userCredentials: IUserCredentials,
  ): Promise<void> => {
    await getUser(userCredentials);
  };

  useEffect((): void => {
    startLoading();
    if (!user && userCredentials) {
      handleSubmit(userCredentials).finally();
    } else if (user) {
      setCredentialsErrorMessage("");
      navigate("/menu_site");
    }
    return stopLoading();
  }, [user, getUser, userCredentials, navigate]);

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | LOGIN",
          helpBtn: true,
        }}
      />
      <main id={"auth"}>
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className={"formContainer"}>
              <Form
                props={{
                  title: "Authentification",
                  inputs: [
                    {
                      label: "Identifiant :",
                      key: "matricule",
                      type: "text",
                      required: true,
                      placeholder: "ex: 6176",
                    },
                    {
                      label: "Mot de passe :",
                      key: "password",
                      type: "password",
                      required: true,
                      placeholder: "ex: decnic",
                    },
                  ],
                  isWithSubmitButton: true,
                  errorMessage: credentialsErrorMessage,
                  setFormData: setUserCredentials,
                }}
              />
            </div>
          )}
        </>
      </main>
      <Footer />
    </>
  );
}
