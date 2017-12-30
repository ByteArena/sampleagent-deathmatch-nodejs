# Image used to build our dependencies:
# We are taking advantage of the multistage build here
# See https://docs.docker.com/engine/userguide/eng-image/multistage-build/ for more details
FROM node:9

ENV NPM_CONFIG_LOGLEVEL error

COPY package.json /tmp/
WORKDIR /tmp/
RUN npm --no-package-lock install

# ---

# Image containing our code and will be used for runtime
FROM node:9

# /usr/app is the root of our code in the container
WORKDIR /usr/app

# Bundle our source code in the container
COPY . /usr/app/
COPY --from=0 /tmp/node_modules /usr/app/node_modules

# Tell Docker how to run our code
CMD [ "node", "./src" ]
