import os, { hostname } from "os"
import { server as WebSocketServer } from 'websocket';
import { createServer } from 'http';

const port = 9000

// creates a http server
const server = createServer(function(req, res) {
    console.log((new Date()) + ' Received request for ' + req.url);

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, this is a GET request!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start http server
server.listen(port, () => {
    console.log(`Example app with: ${hostname}, listening on port ${port}!`);
});

// create the websocket server. we pass in the http server
const wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // always verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});


/**
    - Checks if the given origin is allowed to connect to the WebSocket server.
    - @param {string} origin The origin to check.
    - @return {boolean} True if the origin is allowed, false otherwise.
*/
function originIsAllowed(origin) {
    if (origin.search("http://localhost") >= 0) {
        return true;
    }

    return false;
}

// This callback is called for each incoming connection.
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    // accepts the connection
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');

    // send the client a message whenever the server receives one
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log(`Received Message: ${message.utf8Data} on server ${hostname}`);
            connection.sendUTF(`${message.utf8Data} on server ${hostname}`);
        }
        else if (message.type === 'binary') {
            console.log(`Received Binary Message of ${message.binaryData.length} bytes`);
            connection.sendBytes(message.binaryData);
        }
    });

    // if the request is closed
    connection.on('close', function(reasonCode, description) {
        console.log(`${(new Date())} Peer ${connection.remoteAddress} disconnected.`);
    });
});