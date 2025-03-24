import { useState, useContext } from "react"
import { WebSocketContext } from '../context/WebSocketContext';

function Chat () {
    const [message, setMessage] = useState<string>('')
    const wsContext = useContext(WebSocketContext)

    if (!wsContext) return <div>Loading WebSocket...</div>;

    const { sendMessage, messages } = wsContext;

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