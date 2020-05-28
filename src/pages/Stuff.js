import React from "react";
import { Link } from "react-router-dom";

import { stuff } from "../pages-list.js";

const Stuff = () => (
  <div className="text-center">
    <h1>Stuff</h1>
    <div className="m-3">A list of stuff I made</div>
    <div className="m-3">
      <ul className="list-unstyled">
        {stuff.map(s => (
          <li key={s.path}>
            <Link to={s.path}>{s.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Stuff;
