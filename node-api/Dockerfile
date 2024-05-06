FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./

RUN npm update
RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/app.js" ]