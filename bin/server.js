const express = require('express');
const path = require('path');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
const app = express();

app.use(connectLivereload());
liveReloadServer.watch(path.join(__dirname, '../app'));

app.use(express.static(path.join(__dirname, '../app')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/index.html'));
  });

app.listen(process.env.PORT || 3000, 
  () => console.log('Example app is listening on port 8080.'));

liveReloadServer.server.once("connection", 
  () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
});