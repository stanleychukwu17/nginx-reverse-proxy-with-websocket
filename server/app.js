// import express and use it
import express from 'express';
import os from "os"
import WebSocket from 'ws';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const port = 9000
const hostname = os.hostname
const app = express();
const server = createServer(app); // Create HTTP server
const web_socket_server = new WebSocketServer({ server }); // Attach WebSocket to HTTP server

app.get('/', (req, res) => {
    res.send(`Hello world ${hostname}`);
});

// WebSocket connection handler
web_socket_server.on('connection', (ws) => {
    console.log('New WebSocket connection');
  
    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        ws.send(`Echo: ${message}`); // Echo message back to the client
    });
  
    ws.on('close', () => console.log('Client disconnected'));
});

// Start express server
app.listen(port, () => {
    console.log(`Example app with: ${hostname}, listening on port ${port}!`);
});
