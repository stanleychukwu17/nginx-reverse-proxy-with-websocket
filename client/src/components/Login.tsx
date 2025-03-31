import { useState } from "react"
import { v4 as v4_uuid } from 'uuid';  // Import v4 from uuid

import "./Login.css"
import { userType } from "../App"

type LoginProps = {
    updateUserDetails: React.Dispatch<React.SetStateAction<userType>>
}

export default function Login({updateUserDetails}: LoginProps) {
    const [username, setUsername] = useState<string>('')

    return (
        <div className="login_cvr">
            <form
                className="form_cvr"
                onSubmit={(e) => {
                    e.preventDefault()
                    updateUserDetails({username, uuid: v4_uuid()})
                }}
            >
                <div className="title"><h2>Login</h2></div>
                <div className="input_cvr">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength={4}
                        required
                    />
                </div>
                <div className="btn_cvr">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}