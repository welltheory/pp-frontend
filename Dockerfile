FROM node:18 AS server
ENV NODE_ENV=production
ARG FA_TOKEN
WORKDIR /app
COPY package*.json /
COPY . .
RUN rm -rf ./client
RUN npm ci

FROM node:18 AS client
ENV NODE_ENV=production
ARG FA_TOKEN
WORKDIR /app
COPY client/package*.json /
COPY client/fontawesome /fontawesome
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" $FA_TOKEN
RUN npm ci --legacy-peer-deps
COPY client/. .
RUN npm run build

FROM node:18-slim as app
COPY --from=server /app /app
COPY --from=client /app/build /app/client/build
WORKDIR /app
EXPOSE 3030
CMD ["npm", "start"]
