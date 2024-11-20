/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'


const LoginForm = ({ setToken, show, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN)
    
    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('library-user-token', token)
        }
      }, [result.data, setToken])

    if (!show) {
        return null
      }

    const submit = (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
  
        if (result.data ) {
            setUsername('')
            setPassword('')
            setPage("authors")
        }
    }

    return (
        <div>
            <h2>Log into Application</h2>
            <form onSubmit={submit}>
                <div>
                    Username: 
                    <input type="text" 
                    onChange={({target}) => setUsername(target.value)}
                    value={username}
                    />
                </div>
                <div>
                    Password: 
                    <input type="password" 
                    onChange={({target}) => setPassword(target.value)}
                    value={password}
                    />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm