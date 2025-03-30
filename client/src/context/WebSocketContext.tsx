import { createContext, useEffect, useState, useRef, useCallback } from "react";
import { w3cwebsocket as WebSocketClient } from "websocket"; // Use w3cwebsocket

// console.log(websocket, websocket.w3cwebsocket)

type WebSocketContextType = {
    sendMessage: (message: string) => void
    messages: string[]
}
export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

type WebSocketProviderProps = {
    children: React.ReactNode
}
export const WebSocketProvider = ({children}: WebSocketProviderProps) => {
    const [messages, setMessages] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false); // Track WebSocket connection status
    const ws = useRef<WebSocket>({} as WebSocket);

    const connectWebsocket = useCallback(() => {
        const socket = new WebSocketClient("ws://localhost:9000/", "echo-protocol"); // Correct constructor

        socket.onopen = () => {
            console.log("WebSocket Client Connected");
            socket.send("keep man open")
            setIsOpen(true); // Set connection status to true when connected
        };
        
        socket.onclose = () => {
            console.log("echo-protocol Connection Closed");
            setIsOpen(false); // Update connection status when closed
        };
        
        socket.onerror = (error) => {
            console.log("Connection Error: " + error.message);
        };
        
        socket.onmessage = (message) => {
            console.log("Received: '" + message.data + "'");
            const msg: string[] = [...messages, message.data as string]
            setMessages(msg);
        };

    }, [])

    useEffect(() => {
        connectWebsocket()
    }, [])

    const sendMessage = (message: string) => {
        if (isOpen) {
            ws.current.send(message); // Send the message only if the connection is open
        }
    }

    return (
        <WebSocketContext.Provider value={{sendMessage, messages}}>
            <>
                {children}
            </>
        </WebSocketContext.Provider>
    )
}