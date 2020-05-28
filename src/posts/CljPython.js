import React, { useState, useEffect, useRef } from "react";

import { PostContaier } from "./Common.js";

import marked from "marked";
import hljs from "highlight.js/lib/core";
import clojure from "highlight.js/lib/languages/clojure";
import "highlight.js/styles/github.css";

const withSnippet = Component => {
  return () => <Component />;
};

const CljPython = () => {
  const [snippet, setSnippet] = useState();
  const refSnippet = useRef(null);

  hljs.registerLanguage("clojure", clojure);

  function loadSnippet(path, language, ref) {
    fetch(path)
      .then(response => response.text())
      .then(text => {
        const html = marked(text);
        setSnippet(html.replace("<code>", `<code class='${language}'>`));
        hljs.highlightBlock(ref.current.querySelector("code"));
      });
  }

  useEffect(() => {
    const readmePath = require("./snippets/clj-py-prj.md");

    loadSnippet(readmePath, "clojure", refSnippet);
  });

  return (
    <PostContaier title="Clojure+Python">
      <div>
        <p>
          Lately, I played a bit with{" "}
          <a
            href="https://github.com/clj-python/libpython-clj"
            target="_blank"
            rel="noopener noreferrer"
          >
            libpython-clj
          </a>, a library that enables interops between Clojure and Python,
          making it possible to take full advantage of the huge ecosystem of
          libraries that Python offers.
        </p>
        <p>
          During my day-to-day work, I like writing small tools to automate
          boring jobs (especially QA related), so I tried to use libpython-clj
          for a couple of tools. The first one, in particular, had to check a
          txt file containing a list of URL and for each URL: download the page
          list all the link and scrip with an external source (not inline) check
          the status code of each external resource
        </p>
        <p>
          I would normally use Python for something like this, but I decided to
          give Clojure a try. Clojure, in my opinion, is simply a better
          language to write, test, debug, maintain; so I prefer over any other
          language wherever is possible.
        </p>
        <p>
          The integration with libpython-clj is pretty easy, you just need to
          tweak a bit your project.clj and your core.clj The integration with
          BeatifulSoup was even easier
        </p>
        <div ref={refSnippet} dangerouslySetInnerHTML={{ __html: snippet }} />
        <p>
          Thanks to Clojure nice way of handling parallelism, I only had to use
          pmap instead of map in a couple of spot to reduce the average time of
          execution from more than eight minutes to around three and a half.
        </p>
        ...
      </div>
    </PostContaier>
  );
};

export default withSnippet(CljPython);
