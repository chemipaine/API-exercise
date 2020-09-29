FROM node:12

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY app.js /usr/src/app/

EXPOSE 3000

CMD [ "node", "app.js" ]