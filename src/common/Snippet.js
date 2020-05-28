import React, { useState, useEffect, useRef } from "react";

import marked from "marked";
import hljs from "highlight.js/lib/core";
import clojure from "highlight.js/lib/languages/clojure";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";
hljs.registerLanguage("clojure", clojure);
hljs.registerLanguage("javascript", javascript);

const Snippet = ({ path, language }) => {
  const [snippet, setSnippet] = useState();
  const snippetRef = useRef(null);

  useEffect(() => {
    fetch(path)
      .then(response => response.text())
      .then(text => {
        const html = marked(text);
        setSnippet(html.replace("<code>", `<code class='${language}'>`));
        const el = snippetRef.current.querySelector("code");
        if (el) {
          hljs.highlightBlock(el);
        } else {
          console.warn(`Snippet ("${path}") not found`);
        }
      });
  });

  return <div ref={snippetRef} dangerouslySetInnerHTML={{ __html: snippet }} />;
};

export default Snippet;
