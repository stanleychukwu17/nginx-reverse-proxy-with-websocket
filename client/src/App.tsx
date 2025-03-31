import { useState } from 'react'
import './App.css'
import Chat from './components/Chat'
import Login from './components/Login'

function App () {
    const [username, setUsername] = useState<string>('')

    return (
        <div className='mainCvr'>
            {!username && <Login updateUsername={setUsername} />}
            {username && <Chat username={username} />}
        </div>
    )
}

export default App