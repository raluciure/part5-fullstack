import { useState } from "react"

const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        onSubmit({username, password})
    }

    return (
        <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div>
            password
            <input value={password} type="password" onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
}

export default LoginForm