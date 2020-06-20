FROM node:12.18.1

WORKDIR /srv
COPY package.json yarn.lock /srv/
RUN yarn install

COPY . /srv
