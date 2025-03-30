import express, {Request, Response} from "express";
import http from "http";
import url from "url";
import { WebSocketServer } from "ws";
import {v4 as uuidV4} from "uuid"

const app = express()
const port = 9000

const server = http.createServer(app)
const wsServer = new WebSocketServer({server})


const connections:{
    [uuid: string]: WebSocket
} = {}

const users: {
    [uuid: string]: {
        username: string
        uuid: string
    }
} = {}


// sends the latest message received to everyone connected to the websocket
const handleMessageReceived = (message: string, username: string) => {
    Object.keys(connections).forEach((uuid) => {
        const toSend = { username, message }
        connections[uuid].send(JSON.stringify(toSend))
    })
}

// Handles WebSocket disconnections whenever a user disconnects from the websocket
const handleClose = (uuid: string) => {
    console.log(`connection closed for ${users[uuid].username}`)
    delete connections[uuid]
    delete users[uuid]
}

// Handles new request from the client to connect to the WebSocket
// you can use postman to test your connection, use the url: ws://localhost:${port}?username=stanley
// in postman, don't use a normal GET request, instead click on the yellow button with "New Request" and select "WebSocket"
wsServer.on("connection", (connection, request: http.IncomingMessage) => {
    // check if you allow connections from the origin below
    const origin = request.headers.origin

    const {username} = url.parse(request.url!, true).query
    const uuid = uuidV4()

    console.log(`new connection from ${username}`, uuid)

    // if the request looks something like ?username=stanley&username=mike, we reject the connection request
    // we only want one username per connection
    if (typeof username !== "string") {
        connection.close(4000, 'Invalid username provided'); // 4000 is a custom WebSocket close code
        return
    }
    if (username.length <= 3) {
        connection.close(4000, 'Username too short'); // 4000 is a custom WebSocket close code
        return
    }

    // store the connection
    //@ts-ignore
    connections[uuid] = connection

    // store the user
    users[uuid] = {username, uuid}

    // whenever the connection receives a new message, we forward it to the "handleMessageReceived" function
    connection.on("message", (update) => handleMessageReceived(update as unknown as string, username as string) )

    // when the connection is closed, we clean up the connections and users objects
    connection.on("close", () => {
        handleClose(uuid)
    })
})




// normal HTTP GET request to the root url
app.get("/", (req: Request, res: Response) => {
    res.send('Hello, TypeScript and Node.js! everything cool');
})

// Start the server to handle HTTP and WebSocket connections
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// This ensures that your WebSocket and HTTP servers close gracefully in case of an unexpected shutdown
process.on('SIGINT', () => {
    console.log('Shutting down server...');

    // Close WebSocket server
    wsServer.close();

    // Close HTTP server
    server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0); // Exit the process after closing
    });
})