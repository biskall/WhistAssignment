const http = require('http');
const app = require('./backend/app');
const express = require('express')
// const debug = require('debug')("node-angular");
const port = 3000;

app.set('port', port)
const server = http.createServer(app);

server.listen(port,  async (err) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log(`Server is up and listenning on port ${port}, connecting to mongoDB...`);
})




