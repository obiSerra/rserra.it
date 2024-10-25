#!/bin/bash

docker stop $(docker ps | grep rserra | awk '{print $1}')