/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {

  return (
    <nav>
      <Link className="homeAbout" to="/">
        <div style={{ fontSize: "50px",}}>🦠</div>
      </Link>

      <ul className="nav-links">
        <Link to="/">
          <li className="fill">Home</li>
        </Link>

        <Link to="/graph">
          <li className="fill">Graph</li>
        </Link>

        <Link to="/symptoms">
          <li className="fill">Symptoms</li>
        </Link>

        <Link to="/map">
          <li className="fill">Map</li>
        </Link>

        <Link  to="/about">
          <li className="fill">About</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
