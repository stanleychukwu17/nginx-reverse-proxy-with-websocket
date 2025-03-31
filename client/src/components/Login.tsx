import { useState } from "react"
import "./Login.css"

type LoginProps = {
    updateUsername: (username: string) => void
}

export default function Login({updateUsername}: LoginProps) {
    const [username, setUsername] = useState<string>('')

    return (
        <div className="login_cvr">
            <form
                className="form_cvr"
                onSubmit={(e) => {
                    e.preventDefault()
                    updateUsername(username)
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