```
;; core.clj

(defn load-page
  "Slurp the page"
  [url]
  (-> url
      slurp
      (BeautifulSoup "html.parser")))

(defn check-external-script-status
  "Checks if is an extrnal script and makes a request to check if the HTTP status is valid (200)"
  []
  ...
  )

(defn find-all-scripts
  "Parse the page content using Beautiful Soup"
  [soup]
  (pmap check-external-script-status  ;; Run in parallel
        (py. soup "find_all" "script")))

(defn run [page-list]
  (->> page-list
       (pmap load-entry) ;; Run in parallel
       (pmap find-all-scripts) ;; Run in parallel
       ))
