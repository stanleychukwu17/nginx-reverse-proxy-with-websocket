import './App.css'
import { WebSocketProvider } from './context/WebSocketContext';
import Chat from './components/Chat'

function App () {
    return (
        <div>
            <WebSocketProvider>
                <Chat />
            </WebSocketProvider>
        </div>
    )
}

export default App
