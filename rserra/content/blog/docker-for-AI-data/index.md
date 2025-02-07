---
title: Docker for AI and data science
date: "2023-11-16"
description: "Using Docker for AI and data science"
---
## Why?
Managing dependencies with Python when working on multiple AI and data science problems can quickly become a nightmare; sure, `venv`, `pyenv`, or `pipenv` can help you, but they are not enough, especially if you need to synchronize your work through different machines with different operating systems and architectures.

---
## The solution

Lately, I've been using Docker as my primary development tool for setting up different environments, and I'd like to share the two templates I've been using.

The two setups have a very similar structure:
- `Dockerfile`
- `build.sh`
- `run.sh`
- `run_command.sh` (only for the CUDA setup)
- `.env`
- `working-dir/`

- `.env` file contains the name that Docker will use to build and run the container.
- `build.sh`, `run.sh` and `run_command.sh` are utils scripts to help with building and spinning up the environment.
- `working-dir` is the directory shared between the host environment and the Docker container; you should place all the datasets, models, notebooks, etc., in this directory.
- `Dockerfile` is the core of the setup, containing all the commands to install dependencies and to prepare the environment; any change or tweak for a specific setup should be done here.

### Usage

Using this setup is very simple:
- create the `.env` file following the example provided in the github repo
- run `build.sh`
- run `run.sh`
- enjoy :)

### Jupyter Setup

_you can find the code here: [docker-ml-boilerplate](https://github.com/obiSerra/docker-ml-boilerplate/tree/main)_

The first setup is the one I use when I need to perform data analysis, where I only need `Jupyter`, `Pandas`,`Numpy`, and some data visualization libraries.


**Dockerfile:**
```
FROM jupyter/scipy-notebook

# -- Install dependencies

# RUN pip install ...

RUN mkdir /home/jovyan/working-dir

WORKDIR /home/jovyan/working-dir

# -- Run any setup scripts

```

**build.sh:**
```
#!/usr/bin/env bash

source ./.env

echo "[+] Build docker image:"
echo "${ML_PROJECT_NAME}"

docker build -t $ML_PROJECT_NAME  .
```

**run.sh:**
```
#!/usr/bin/env bash

source ./.env

echo "[+] Running docker env:"
echo "${ML_PROJECT_NAME}"

docker run -p 8888:8888 -v ./working-dir:/home/jovyan/working-dir $ML_PROJECT_NAME
```

### Machine Learning with CUDA support

_you can find the code here: [docker-ml-boilerplate-CUDA](https://github.com/obiSerra/docker-ml-boilerplate-CUDA)_

I use The second template when I need to leverage my computer's GPU to train different ML models for some projects.

(note: depending on your Docker installation you may need to use `sudo` to run the `docker` commands)

**Dockerfile:**
```
FROM nvidia/cuda:11.4.3-runtime-ubuntu20.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y git python3-pip python3-dev python3-opencv libglib2.0-0

# Upgrade pip
RUN python3 -m pip install --upgrade pip

# Install PyTorch and torchvision
RUN pip3 install torch torchvision torchaudio -f https://download.pytorch.org/whl/cu111/torch_stable.html

RUN pip3 install jupyterlab numpy matplotlib pandas seaborn ipywidgets scipy

# RUN other pip install ...

RUN mkdir /home/working-dir

WORKDIR /home/working-dir

# -- Run any setup scripts
```

**build.sh** (same as the Jupyter setup):

**run.sh:**

```
#!/usr/bin/env bash

source ./.env


echo "[+] Running docker env:"
echo "${ML_PROJECT_NAME}"

docker run -v ./working-dir:/home/working-dir --gpus all -p 8888:8888  $ML_PROJECT_NAME jupyter lab --allow-root --ip=0.0.0.0
```

**run_command.sh:**

```
#!/usr/bin/env bash

source ./.env


echo "[+] Running docker env:"
echo "${ML_PROJECT_NAME}"

docker run -v ./working-dir:/home/working-dir --gpus all -p 8888:8888 $ML_PROJECT_NAME $@
```


## Conclusions

Using Docker to handle Machine Learning environments has many advantages:
- Keeps all dependencies well managed and separated, avoiding the risk of breaking one project while updating another one.
- It is easy to replicate on multiple projects while quickly tweaking, updating a version, or adding a new dependency.
- Very easy to use: build the Docker once and then run it each time you need to spin up your environment. Even if you need to update the Dockerfile, leveraging the Docker cache, rebuilding the image is pretty quick.
- You can run your docker image on a machine (e.g., a powerful desktop or server) and connect to the Jupyter web interface from a different machine (your old and low-budget laptop).