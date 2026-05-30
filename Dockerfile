FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

WORKDIR /usr/src/app/frontend
RUN npm ci && npm run build

WORKDIR /usr/src/app/backend
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "server.js"]