import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import { userType } from "../App";


type chatProps = {
    userDetails: userType
}

type eachChatProps = {
    uuid: string
    username: string
    msg: string
    owner: boolean
}
type allChatProps = eachChatProps[]


const OthersMessage = ({username, msg}: eachChatProps) => {
    return (
        <div className="Not_Me">
            <div className="avatar">S</div>
            <div className="msg_cvr">
                <div className="msg_dts">
                    {msg}
                </div>
                <div className="msg_name">
                    {username}
                </div>
            </div>
        </div>
    )
}

const MyMessage = ({username, msg}: eachChatProps) => {
    return (
        <div className="This_Me ">
            <div className="msg_cvr">
                <div className="msg_dts">
                    {msg}
                </div>
                <div className="msg_name">
                    {username}
                </div>
            </div>
            <div className="avatar">{username[0]}</div>
        </div>
    )
}

const arr: eachChatProps[] = new Array(3).fill({
    uuid: 'string',
    username: 'stanley edward',
    msg: 'stanley',
    owner: false
 });

function Chat ({userDetails}: chatProps) {
    const [msgToSend, setMsgToSend] = useState<string>('')
    const { username, uuid } = userDetails
    const WS_URL = "ws://localhost:9000" // websocket url
    const [allChats, setAllChats] = useState<allChatProps>([])
    // const [newChat, setNewChat] = useState<[]>([])

    useEffect(() => {
        setAllChats(arr)
    }, [])

    // establishes a new websocket connection "sendJsonMessage" functions is returned,
    // we will use it to send json messages to websocket server
    const { sendJsonMessage } = useWebSocket(WS_URL, {
        // this is useful if you want to pass parameters to the websocket server (i.e ws://localhost:9000?username=John)
        queryParams: { username, uuid },

        // onMessage handles new messages received from the websocket server
        onMessage: (event) => {
            const newChat:eachChatProps = JSON.parse(event.data)

            // check if the message belongs to the person sending the message
            if (newChat.uuid === uuid) {
                newChat.owner = true;
            } else {
                newChat.owner = false;
            }

            // add the new message to the messages array
            setAllChats([...allChats, newChat])

            console.log("message received", newChat)
            console.log("all messages", allChats)
        },

        // shouldReconnect is useful if you want to reconnect to the websocket server when the connection closes unexpectedly (e.g: maybe the server closes the connection)
        shouldReconnect: () => false,
        reconnectInterval: 1000, // in ms
        reconnectAttempts: 20,
    })


    // handleSend function sends the message to the server by calling the "sendMessage" function
    const handleSend = () => {
        if (msgToSend.trim() !== '') {
            sendJsonMessage({ msg: msgToSend })
            setMsgToSend('');
        }
    };

    return (
        <div className="Chat">
            <h3>Hey {username}, Welcome to Nginx Group Chat</h3>
            <div className="chat_cvr">
                {
                    allChats.map((chat, index) => {
                        if (chat.owner == true) {
                            return <MyMessage key={index} {...chat} />
                        } else {
                            return <OthersMessage key={index} {...chat} />
                        }
                    })
                }
            </div>
            <div className="input_cvr">
                <form
                    action=""
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                >
                    <input
                        type="text"
                        value={msgToSend}
                        onChange={(e) => setMsgToSend(e.target.value)}
                        placeholder="Type a message..."
                        required
                        minLength={2}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat