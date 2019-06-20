import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Console from "./pages/Console";
import Controller from "./pages/Controller";

/** Aplição principal */
const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/console/" component={Console} />
      <Route path="/controller/" component={Controller} />
    </BrowserRouter>
  );
};

export default App;
