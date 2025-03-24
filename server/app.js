// import express and use it
import express from 'express';
import os from "os"
import { server as WebSocketServer } from 'websocket';
import { createServer } from 'http';

const port = 9000
const hostname = os.hostname
// const app = express();

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

// Start express server
server.listen(port, () => {
    console.log(`Example app with: ${hostname}, listening on port ${port}!`);
});


const wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // always verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

// logic to see if the request from the origin is allowed
function originIsAllowed(origin) {
    if (origin.search("http://localhost") >= 0) {
        return true;
    }

    return false;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept(null, request.origin);

    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});