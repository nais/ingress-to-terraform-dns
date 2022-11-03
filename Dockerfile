FROM node:18.9.1-slim AS test
WORKDIR /app/
ADD src/ ./src
COPY package*.json ./
COPY .babelrc ./

RUN npm install --production=false
RUN npm test

FROM node:18.9.1-slim

RUN apk add --no-cache git

WORKDIR /app/
COPY src/*.js ./
COPY package*.json ./
RUN npm install

COPY entrypoint.sh /
ENTRYPOINT /entrypoint.sh
