// styles
import "./utils/styles/global.scss";

// hooks | libraries
import { createRoot } from "react-dom/client";

// components
import App from "./App.tsx";

// context
import { LoaderProvider } from "./context/loaderContext.tsx";
import { UserProvider } from "./context/userContext.tsx";
import { SiteProvider } from "./context/siteContext.tsx";
import { CourrierProvider } from "./context/courrierContext.tsx";
import { TiersProvider } from "./context/tiersContext.tsx";
import { FileProvider } from "./context/fileContext/FileProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <LoaderProvider>
    <UserProvider>
      <SiteProvider>
        <TiersProvider>
          <FileProvider>
            <CourrierProvider>
              <App />
            </CourrierProvider>
          </FileProvider>
        </TiersProvider>
      </SiteProvider>
    </UserProvider>
  </LoaderProvider>,
);
