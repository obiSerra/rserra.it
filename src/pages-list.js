import React from "react";

import Home from "./pages/Home.js";
import Stuff from "./pages/Stuff.js";
import Posts from "./pages/Posts.js";

// stuff imports
import Graham from "./stuff/Graham.js";

// posts imports
import CljPython from "./posts/CljPython.js";
export const stuffHub = { path: "/stuff", exact: true, component: <Stuff /> };
export const postsHub = { path: "/posts", exact: true, component: <Posts /> };
export const home = { path: "/", exact: true, component: <Home /> };
export const pages = [stuffHub, postsHub, home];

export const stuff = [
  {
    path: "/stuff/graham-scan",
    exact: false,
    component: <Graham />,
    title: "Graham's scan"
  }
];

export const posts = [
  {
    path: "/posts/clj+python",
    component: <CljPython />,
    title: "Clojure+Python"
  }
];
