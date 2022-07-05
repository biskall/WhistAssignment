FROM  node:16.13.0-slim AS server_build_node

WORKDIR /app

COPY . .

RUN npm install --production
RUN npm install -g nodemon 

EXPOSE 3000

CMD ["node" , "server"]