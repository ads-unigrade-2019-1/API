FROM node:latest

WORKDIR /usr/app

COPY package*.json ./
RUN apt-get update && apt-get install yarn -y
RUN yarn install && npm install -y

COPY . .

EXPOSE 3000
