// import express and use it
import express from 'express';
import os from "os"
import WebSocket  from "ws"
import http from "http"


const port = 9000
const app = express();
const hostname = os.hostname
const web_server = http.createServer(app)
const web_socket_server = new WebSocket.server({"server": web_server})

app.get('/', (req, res) => {
    res.send(`Hello world ${hostname}`);
});

// WebSocket connection handling
web_socket_server.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Echo: ${message}`); // Echo message back to client
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start express server
app.listen(port, () => {
    console.log(`Example app with: ${hostname}, listening on port ${port}!`);
});
