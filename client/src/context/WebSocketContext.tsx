import { createContext, useEffect, useState, useRef } from "react";

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
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:9000'); // Connect to WebSocket server

        ws.current.onopen = () => {
            console.log('WebSocket connected');
            ws.current?.send("Hello, Server!"); // Ensure you're sending some data to keep the connection active
        };

        ws.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
      
        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.current?.close();
        }
    }, [])

    const sendMessage = (message: string) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(message)
        } else {
            alert('WebSocket is not open')
        }
    }

    return (
        <WebSocketContext.Provider value={{sendMessage, messages}}>
            {children}
        </WebSocketContext.Provider>
    )
}