// styles
import "./utils/styles/global.scss";

// hooks | libraries
import { createRoot } from "react-dom/client";

// components
import App from "./App.tsx";

// context
import { LoaderProvider } from "./context/LoaderContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <LoaderProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </LoaderProvider>,
);
