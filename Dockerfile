FROM node:12.17.0

WORKDIR /srv
COPY package.json yarn.lock /srv/
RUN yarn install

COPY . /srv
