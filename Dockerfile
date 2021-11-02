FROM node:14 as builder

ENV NODE_ENV=production

WORKDIR /app


COPY package*.json ./

RUN npm ci --only=production

COPY . .

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 8080
CMD [ "node", "server.js" ]
