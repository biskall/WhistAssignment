FROM node:16.13.0-slim AS client_build_node

WORKDIR /app

COPY package.json /app/package.json


RUN npm install && npm install -g @angular/cli
# RUN node_modules/.bin/ng build --configuration production

COPY . .

EXPOSE 4200

CMD ng serve --host 0.0.0.0
