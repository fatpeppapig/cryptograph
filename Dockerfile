FROM node:lts AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts
COPY --from=build /app/dist /app
COPY package.json package-lock.json ./

RUN npm install

WORKDIR /app

EXPOSE 3000
CMD ["node", "index.js"]