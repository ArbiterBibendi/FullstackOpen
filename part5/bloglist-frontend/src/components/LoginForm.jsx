import React, { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            console.log(user);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    username<input type='text' name='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    password<input type='text' name='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
