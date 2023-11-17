FROM node:20-alpine

RUN npm install --global pnpm

COPY . .

WORKDIR /http
RUN pnpm install

EXPOSE 8080

CMD ["pnpm", "start"]
