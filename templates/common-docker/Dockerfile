FROM node:16.2.0

RUN mkdir --parents /usr/src/cache
WORKDIR /usr/src/cache
COPY ./package*.json ./
RUN npm install

RUN mkdir --parents /usr/src/app
WORKDIR /usr/src/app

CMD /usr/src/app/entrypoint.sh
