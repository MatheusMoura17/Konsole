import * as React from "react";
import { Link } from "react-router-dom";

/** Página inicial */
const Home = () => {
  return (
    <div>
      <div>Escolha um modo</div>
      <Link to="/console">
        <button>Console</button>
      </Link>
      <Link to="/controller">
        <button>Controle</button>
      </Link>
    </div>
  );
};
export default Home;
