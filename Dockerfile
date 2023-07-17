FROM node:16-alpine

WORKDIR /app

RUN npm install --global pnpm

COPY ./http/package.json ./http/pnpm-lock.yaml schema.json ./

RUN pnpm install

COPY ./http/index.js .

EXPOSE 8080

CMD ["pnpm", "start"]
