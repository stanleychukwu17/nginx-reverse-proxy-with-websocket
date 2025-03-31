import { useState } from 'react'
import './App.css'
import Chat from './components/Chat'
import Login from './components/Login'

export type userType = {username: string, uuid: string}

function App () {
    const [userDetails, setUserDetails] = useState<userType>({username: '', uuid: ''})

    return (
        <div className='mainCvr'>
            {!userDetails.uuid && <Login updateUserDetails={setUserDetails} />}
            {userDetails.uuid && <Chat userDetails={userDetails} />}
        </div>
    )
}

export default App