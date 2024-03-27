const AgonesSDK = require('@google-cloud/agones-sdk');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Connect to the Agones SDK server
const agonesSDK = new AgonesSDK();
agonesSDK.connect();

// Send health ping every 2s
setInterval(() => agonesSDK.health(), 1000 * 2);

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

const port = process.env.PORT || 7654;
server.listen(port, () => console.log(`listening on ${port}!`));

// Mark this gameserver as Ready
console.log('marking self as ready');
agonesSDK.ready();
