const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let userCount = 0;

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(data));
  });
};

//callback for when a client opens the socket
wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount += 1;
  const newUser = { type: 'newUser', count: userCount };
  wss.broadcast(newUser);

  //callback for when a client sends a message
  //parse the msg, give it an id, and broadcast the msg
  ws.on('message', (msg) => {
    const incomingClientMessage = JSON.parse(msg);
    incomingClientMessage.id = uuidv4();
    wss.broadcast(incomingClientMessage);
  })

  // Set up a callback for when a client closes the socket
  ws.on('close', () => {
    console.log('Client disconnected');
    userCount -= 1;
    const lostUser = { type: 'lostUser', count: userCount };
    wss.broadcast(lostUser);
  });

});