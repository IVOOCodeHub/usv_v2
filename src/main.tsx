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

createRoot(document.getElementById("root")!).render(
  <LoaderProvider>
    <UserProvider>
      <SiteProvider>
        <App />
      </SiteProvider>
    </UserProvider>
  </LoaderProvider>,
);
