FROM node:latest

ARG PORT=3000

WORKDIR /usr/app

COPY package*.json ./
RUN apt-get update && apt-get install yarn -y
RUN yarn install -y && npm install -y

COPY . .

EXPOSE $PORT

CMD yarn start