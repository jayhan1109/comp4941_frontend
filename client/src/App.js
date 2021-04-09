import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./component/Navigation";
import Unit from "./pages/Unit";
import Client from "./pages/Client";
import History from "./pages/History";
import Service from "./pages/Service";
import CreateClient from "./pages/CreateClient";
import CreateService from "./pages/CreateService";
import CreateHistory from './pages/CreateHistory'

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">Project</h3>

        <Navigation />

        <Switch>
          <Route path="/unit" component={Unit} exact />
          <Route path="/client" component={Client} exact />
          <Route path="/createclient" component={CreateClient} exact />
          <Route path="/history" component={History} exact />
          <Route path="/createHistory" component={CreateHistory} exact />
          <Route path="/service" component={Service} exact />
          <Route path="/createService" component={CreateService} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
