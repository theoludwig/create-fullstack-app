ARG NODE_VERSION=16.1.0

FROM node:${NODE_VERSION} AS dependencies
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm clean-install

FROM node:${NODE_VERSION} AS builder
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/prisma ./prisma
RUN npx prisma generate
USER node
CMD npx prisma migrate deploy && node build/index.js
