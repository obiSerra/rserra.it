import React from "react";
import { Link } from "react-router-dom";

import { posts } from "../pages-list.js";

const Posts = () => (
  <div className="text-center">
    <h1>Posts</h1>
    <div className="m-3">A list of stuff I wrote</div>
    <div className="m-3">
      <ul className="list-unstyled">
        {posts.map(p => (
          <li key={p.path}>
            <Link to={p.path}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Posts;
