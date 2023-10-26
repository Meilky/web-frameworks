# ---- Base
FROM node:latest as base 

WORKDIR /usr/app/

COPY ./package.json .
COPY ./package-lock.json .
COPY ./src ./src

RUN npm install


# ---- Prod
FROM base as prod

CMD npm run start


# ---- Dev
FROM base as dev

CMD npm run watch
