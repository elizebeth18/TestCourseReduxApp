#uses node server
FROM node:20-alpine

#goes to the app directory
WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm","run","dev" ]