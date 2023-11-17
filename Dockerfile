FROM node:16-alpine

RUN npm install --global pnpm

COPY . .

RUN pnpm build

WORKDIR /http
RUN pnpm install

EXPOSE 8080

CMD ["pnpm", "start"]
