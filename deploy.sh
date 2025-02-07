#!/bin/bash

echo "export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" > rserra/.env
echo "export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" >> rserra/.env
echo "export AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}" >> rserra/.env


docker run -it -v ./rserra/:/app/ rserra build_and_deploy.sh 