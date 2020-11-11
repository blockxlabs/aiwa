FROM node:10.23.0-alpine3.10

RUN apk update && \
        apk add git && apk add python && apk add build-base
WORKDIR /app
RUN CI=true
COPY package.json ./
COPY package-lock.json ./

RUN yarn install








