FROM node:alpine
WORKDIR /app

COPY package.json .
COPY public /app/public
COPY server /app/server

RUN npm install
CMD [ "node", "server/main.js" ]
