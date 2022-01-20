import React from "react";

//Pages import
import Home from "./pages/Home.js";
import Stuff from "./pages/Stuff.js";
import Posts from "./pages/Posts.js";

// Unlisted Import

import Poker from "./unlisted/Poker.js";

// stuff imports
import Graham from "./stuff/Graham.js";
import Boids from "./stuff/Boids";
// posts imports
import CljPython from "./posts/CljPython.js";

//
export const stuffHub = { path: "/stuff", exact: true, component: <Stuff /> };
export const postsHub = { path: "/posts", exact: true, component: <Posts /> };
export const home = { path: "/", exact: true, component: <Home /> };
export const pages = [stuffHub, postsHub];
export const stuff = [
  {
    path: "/stuff/graham-scan",
    exact: false,
    component: <Graham />,
    title: "Graham's scan"
  },
  {
    path: "/stuff/boids/",
    exact: false,
    component: <Boids />,
    title: "Boids"
  }
];

export const posts = [
  {
    path: "/posts/clj+python",
    component: <CljPython />,
    title: "Clojure+Python"
  }
];

export const unlisted = [
  {
    path: "/poker",
    component: <Poker />,
    title: "Poker tools"
  }
];
