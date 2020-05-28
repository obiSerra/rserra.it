import React from "react";
import { Link } from "react-router-dom";
import { postsHub } from "../pages-list.js";

import "./Post.scss";

export const PostContaier = ({ title, children }) => (
  <div className="post-container">
    <div className="back-all-posts">
      <Link to={postsHub.path}> &lt; Back to all posts</Link>
    </div>
    <div className="text-center">
      <h1>{title}</h1>
    </div>

    <div className="post-body">{children}</div>
  </div>
);
