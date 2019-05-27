FROM node:latest

ARG PORT=3000

WORKDIR /usr/app

USER root

COPY . .

RUN apt-get update && apt-get install yarn -y
RUN yarn install && npm install


EXPOSE $PORT

CMD yarn start