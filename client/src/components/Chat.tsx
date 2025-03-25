import { useState, useContext } from "react"
import { WebSocketContext } from '../context/WebSocketContext';

function Chat () {
    const [message, setMessage] = useState<string>('')
    const wsContext = useContext(WebSocketContext)

    // if the websocket is not ready, do not render
    if (!wsContext) return <div>Loading WebSocket...</div>;

    // destructure the sendMessage and messages from the context, so we can use them in the component
    // the sendMessage is a function that sends a message to the server & messages is an array of messages from the server
    const { sendMessage, messages } = wsContext;

    // handleSend function sends the message to the server by calling the "sendMessage" function
    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>WebSocket Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div className="input_cvr">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat