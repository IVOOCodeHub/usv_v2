// types
import { ReactElement } from "react";

// hooks | libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// views
import Auth from "./views/auth/Auth";
import TestPage from "./views/testPage/TestPage";

function App(): ReactElement {
  return (
    <Router basename={"usv"}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path={"auth"} element={<Auth />} />
        <Route path={"test"} element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
