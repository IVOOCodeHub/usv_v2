// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";

// components
import Header from "../../../../components_library/src/components/header/Header";
import Footer from "../../../../components_library/src/components/footer/Footer";
import Button from "../../../../components_library/src/components/button/Button";

// hooks | libraries
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// context
import { UserContext } from "../../context/UserContext.tsx";

export default function TestPage(): ReactElement {
  const { user, setUser } = useContext(UserContext);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  const isOK = () => {
    switch (user) {
      case null:
        return <span style={{ color: "#DA033BFF" }}>KO</span>;
      case user:
        return <span style={{ color: "#00CC66FF" }}>OK</span>;
    }
  };

  return (
    <div>
      <Header
        props={{
          pageURL: "GIVOO | LOGIN",
          helpBtn: true,
        }}
      />
      <>
        {user && (
          <>
            <main
              id={"testPage"}
              style={{
                minHeight: "78dvh",
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3rem",
              }}
            >
              <h1>Test page {isOK()}</h1>
              <h2>Vous êtes connecté en tant que</h2>
              <ul
                style={{
                  display: "flex",
                  flexFlow: "column",
                  gap: ".5em",
                }}
              >
                <li>
                  Utilisateur : {user.lastName} {user.firstName}
                </li>
                <li>Matricule : {user.matricule}</li>
              </ul>

              <Button
                props={{
                  style: "blue",
                  text: "Retour",
                  type: "button",
                  onClick: (): void => {
                    setUser(null);
                    navigate("/");
                  },
                }}
              />
            </main>
            <Footer />
          </>
        )}
      </>
    </div>
  );
}
