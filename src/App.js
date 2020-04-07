import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home.js";
import Stuff from "./Stuff.js";
import "./App.css";

const Navbar = () => (
  <div className="bg-dark">
    <nav className="container d-flex justify-content-between">
      <Link className="navbar-brand" to="/">
        rserra
      </Link>
      <div className="d-flex justify-content-end" id="navbar">
        <Link className="nav-item nav-link active" to="/">
          Home <span className="sr-only">(current)</span>
        </Link>
        {/*
        <Link className="nav-item nav-link" to="/stuff">
          Stuff
          </Link>
         */}
      </div>
    </nav>
  </div>
);

const App = () => (
  <div className="min-vh-100">
    <Router>
      <header className="app-header">
        <Navbar />
      </header>

      <main role="main" className="container main-content">
        <Switch>
          <Route path="/stuff">
            <Stuff />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
    <footer className="footer">
      <div className="container text-center">
        <a
          href="https://github.com/obiSerra/rserra.it"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source for this website
        </a>
      </div>
    </footer>
  </div>
);

export default App;
