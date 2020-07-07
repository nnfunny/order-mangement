import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/orders" component={Orders} />
      </Switch>
    </div>
  );
}

export default App;
