// styles
import "./utils/styles/global.scss";

// hooks | libraries
import { createRoot } from "react-dom/client";

// components
import App from "./App.tsx";

// context
import { LoaderProvider } from "./context/loaderContext.tsx";
import { UserProvider } from "./context/userContext/UserProvider.tsx";
import { SiteProvider } from "./context/siteContext.tsx";
import { CourrierProvider } from "./context/courrierContext/CourrierProvider";
import { TiersProvider } from "./context/tiersContext.tsx";
import { PrevisionProvider } from "./context/previsionContext/PrevisionProvider.tsx";
import { FileProvider } from "./context/fileContext/FileProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <LoaderProvider>
    <UserProvider>
      <SiteProvider>
        <TiersProvider>
          <PrevisionProvider>
            <FileProvider>
              <CourrierProvider>
                <App />
              </CourrierProvider>
            </FileProvider>
          </PrevisionProvider>
        </TiersProvider>
      </SiteProvider>
    </UserProvider>
  </LoaderProvider>,
);
