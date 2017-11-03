const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const querystring = require('querystring');
const fetch = require('node-fetch');

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

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};

//callback for when a client opens the socket
wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount += 1;
  const newUser = { type: 'newUser', count: userCount };
  wss.broadcast(JSON.stringify(newUser));

  //callback for when a client sends a message
  //parse the msg, give it an id, and broadcast the msg
  ws.on('message', (msg) => {
    var message = JSON.parse(msg);
    message.id = uuidv4();

    if (matches = message.content.match(/^\/giphy (.+)$/)) {
    let qs = querystring.stringify({
      api_key: 'K2hRRtWn2Ow70eNk1AYyUGBn3tlM67Vj',
      tag: matches[1]
      });
    fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
      .then( resp => {return resp.json() } )
      .then( json => {
        message.content = `<img src="${json.data.image_url}" alt=""/>`
        var to_send = JSON.stringify(message);
        wss.broadcast(to_send);
      })
    } else {
      var to_send = JSON.stringify(message);
      wss.broadcast(to_send);
    }
  })

  // Set up a callback for when a client closes the socket
  ws.on('close', () => {
    console.log('Client disconnected');
    userCount -= 1;
    const lostUser = { type: 'lostUser', count: userCount };
    wss.broadcast(JSON.stringify(lostUser));
  });

});