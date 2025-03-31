import { useState } from 'react'
import './App.css'
import Chat from './components/Chat'

function App () {
    const [username, setUsername] = useState<string>('')

    return (
        <div className='mainCvr'>
            {!username && <Login />}
            {username && <Chat />}
        </div>
    )
}

export default App