#!/bin/bash

docker run -it -p 8000:8000 -v ./rserra/:/app/ rserra run_develop.sh 

# docker run -d -v ./rserra/:/app/ -p 8000:8000 rserra run_develop.sh