import { useState } from "react"

// create an array and fill it with messages
const arr: {name: string}[] = new Array(50).fill({ name: "John" });


function Chat () {
    const [message, setMessage] = useState<string>('')

    // if the websocket is not ready, do not render

    // destructure the sendMessage and messages from the context, so we can use them in the component
    // the sendMessage is a function that sends a message to the server & messages is an array of messages from the server

    // handleSend function sends the message to the server by calling the "sendMessage" function
    const handleSend = () => {
        if (message.trim()) {
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Group Chat, Nginx!!!</h1>
            <div>
                {
                    arr.map((msg, index) => {
                        return (<div key={index}>{msg.name}</div>)
                    })
                }
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