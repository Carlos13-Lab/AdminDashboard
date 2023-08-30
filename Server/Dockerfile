FROM node:18-alpine 

WORKDIR /app

COPY package*.json  .


RUN npm install

EXPOSE 5001

COPY . .

CMD [ "npm","run","dev" ]