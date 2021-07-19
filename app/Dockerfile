FROM node:carbon
WORKDIR /opt/app
COPY package*json ./
RUN npm i -q
COPY . .
CMD npm start
