FROM node:16.15.0-alpine as build-stage

WORKDIR /app

COPY ./package*.json /app/

RUN npm ci
COPY . /app/

RUN npm run build

FROM nginx:1.21.6-alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
