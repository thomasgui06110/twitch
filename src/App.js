import React from "react";

import "./App.css";
import Header from "./components/HEader/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Games from "./components/games/Games";
import TopStreams from "./components/topStreams/TopStreams";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Live from "./components/Live/Live";
import GameStreams from "./components/gameStreams/GameStreams";
import Resultats from "./components/resultats/Resultats";
import Erreur from "./components/erreur/Erreur";

function App() {
  return (
    <Router
   // forceRefresh={true}
    >
      <div className="App">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/top-streams" component={TopStreams} />
          <Route exact path="/live/:slug" component={Live} />
          <Route exact path="/game/:slug" component={GameStreams} />
          <Route exact path="/resultats/:slug" component={Resultats} />
          <Route exact path="/resultats/" component={Erreur}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
