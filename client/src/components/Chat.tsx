import { useState } from "react"

// create an array and fill it with messages
const arr: {name: string}[] = new Array(12).fill({ name: "John" });

type chatProps = {
    username: string
}

function Chat ({username}: chatProps) {
    const [msgToSend, setMsgToSend] = useState<string>('')
    // const [allChats, setAllChats] = useState<[]>([])
    // const [newChat, setNewChat] = useState<[]>([])



    // handleSend function sends the message to the server by calling the "sendMessage" function
    const handleSend = () => {
        if (msgToSend.trim()) {
            setMsgToSend('');
        }
    };

    return (
        <div className="Chat">
            <h3>Hey {username}, Welcome to Nginx Group Chat</h3>
            <div className="chat_cvr">
                {
                    arr.map((_, index) => {
                        return (
                            <div key={index} className="Not_Me">
                                <div className="avatar">S</div>
                                <div className="msg_cvr">
                                    <div className="msg_dts">
                                        destructure the sendMessage and messages from the context, so we can use them in the component
                                        the sendMessage is a function that sends a message to the server & messages is an array of messages from the server
                                    </div>
                                    <div className="msg_name">
                                        stanley chukwu
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    arr.map((_, index) => {
                        return (
                            <div key={index} className="This_Me ">
                                <div className="msg_cvr">
                                    <div className="msg_dts">
                                        destructure the sendMessage and messages from the context, so we can use them in the component
                                        the sendMessage is a function that sends a message to the server & messages is an array of messages from the server
                                    </div>
                                    <div className="msg_name">
                                        stanley chukwu
                                    </div>
                                </div>
                                <div className="avatar">S</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="input_cvr">
                <input
                    type="text"
                    value={msgToSend}
                    onChange={(e) => setMsgToSend(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat