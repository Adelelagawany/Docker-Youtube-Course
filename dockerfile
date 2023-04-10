FROM node:18.15.0 AS base
WORKDIR /adelappfolder
COPY package.json .

FROM base AS Dev
RUN npm install
COPY . .
CMD ["npm","run","start-dev"]

FROM base AS Prod
RUN npm install --only=production
COPY . .
CMD ["npm","start"]