FROM node:16.5.0 AS dependencies
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm clean-install

FROM node:16.5.0 AS builder
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM node:16.5.0 AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/prisma ./prisma
RUN npx prisma generate
USER node
CMD npx prisma migrate deploy && node build/index.js
