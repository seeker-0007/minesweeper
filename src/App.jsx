import { useState } from "react";

import Menu from "./components/Menu.jsx";
import Playground from "./components/Playground.jsx";

import "./styles/App.css";

const App = () => {
  const [bombCount, changeBombCount] = useState(vars.gameBombCount);

  return (
    <>
      <Menu bombCount={bombCount} />
      <Playground bombCount={bombCount} changeBombCount={changeBombCount} />
    </>
  );
};

export default App;
