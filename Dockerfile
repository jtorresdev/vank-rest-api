FROM node:16

RUN mkdir -p /node
WORKDIR /node

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

WORKDIR /node/app

COPY . .