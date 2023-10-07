import { useState } from 'react';

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setUsername('');
        setPassword('');
        login(username, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                username<input type='text' value={username} name='Username' onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                password<input type='text' value={password} name='Password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type='submit' value='login' />
        </form>
    );
}

export default LoginForm;
