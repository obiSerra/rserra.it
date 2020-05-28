```
;; project.clj

(defproject asset-checker "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [clj-python/libpython-clj "1.42"]]
  :main asset-checker.main
  :aot [asset-checker.main] ;; leave the ns that integrates Python out the AOT compilation
  :target-path "target/%s")
...
;; main.clj

(ns asset-checker.main
  (:gen-class :main true))

(defn -main
  "Load the ns that integrate Python at runtime"
  [& args]

  (binding [*ns* *ns*]
    (require 'asset-checker.core)
    (in-ns 'asset-checker.core)
    (apply (resolve 'asset-checker.core/-main) args)))
