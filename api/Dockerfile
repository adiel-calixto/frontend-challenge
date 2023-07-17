FROM node:18-alpine

WORKDIR /usr/src/app

COPY yarn.lock ./
RUN yarn

COPY . .
EXPOSE 3333

CMD yarn start:docker
