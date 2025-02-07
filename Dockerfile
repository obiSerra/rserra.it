FROM node:20-slim

RUN mkdir /app
WORKDIR /app

COPY ./rserra/ /app

RUN npm install
RUN apt update && apt install -y curl unzip
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install


ENTRYPOINT [ "/bin/bash" ]