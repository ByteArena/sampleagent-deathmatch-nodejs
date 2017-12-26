FROM node:7

COPY package.json /tmp/
WORKDIR /tmp/
RUN npm install

FROM node:7
ENV NPM_CONFIG_LOGLEVEL error

# /usr/app is the root of our code in the container
WORKDIR /usr/app

# Bundle our source code in the container
COPY . /usr/app/
COPY --from=0 /tmp/node_modules /usr/app/node_modules

# Install dependencies
RUN npm install

# Build the source
RUN npm run build

# Tell Docker how to run our code
CMD [ "npm", "start" ]
