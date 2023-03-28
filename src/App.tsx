import React from "react";
import Main from "./Components/Main.tsx";
import { BrowserRouter as Router} from 'react-router-dom';
import "./Components/style.css";
function App() {
  return (
    <>
    <Router>
    <Main
      />
      </Router>
    </>
  );
}

export default App;
