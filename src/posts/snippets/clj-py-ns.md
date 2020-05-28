```
;; core.clj

(ns asset-checker.core
  (:require [clojure.string :as s]
            [libpython-clj.require :refer [require-python]]
            [libpython-clj.python :refer [py. py.. py.- initialize!
                                          run-simple-string import-module
                                          att-type-map] :as py])
  (:import (java.io BufferedReader FileReader)))

;; Initialize python
(initialize!)
;; Require python deps
(require-python '[bs4 :refer [BeautifulSoup]])
