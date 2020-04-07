import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

const Stuff = () => (
  <div className="text-center">
    <h1>Stuff</h1>
    <div className="m-3">A list of stuff I made</div>
    <div className="m-3">
      <ul className="list-unstyled">
        <li>
          <Link to="/stuff/graham-scan">Graham's scan</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Stuff;
