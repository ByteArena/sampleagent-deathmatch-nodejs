FROM node:7

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/app

# Install app dependencies
COPY package.json /usr/app/
RUN npm install

# Bundle app source
COPY . /usr/app

# Build source
RUN npm run build

CMD [ "npm", "start" ]

