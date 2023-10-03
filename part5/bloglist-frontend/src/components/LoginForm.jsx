import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ setUser, showNotificationError }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            window.localStorage.setItem('user', JSON.stringify(user));
            blogService.setToken(user.token);
        } catch (error) {
            showNotificationError('wrong username or password');
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
