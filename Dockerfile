FROM node:alpine as dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3500

CMD [ "node", "dist/main.js" ]
