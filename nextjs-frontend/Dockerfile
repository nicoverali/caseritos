FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

RUN npm run build

CMD [ "npm", "run dev" ]