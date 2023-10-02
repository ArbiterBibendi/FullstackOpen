import {useState} from 'react';
import loginService from '../services/login';
import noteService from '../services/notes';

const LoginForm = ({setUser, setErrorMessage}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const returnedUser = await loginService.login({ username, password });
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(returnedUser));
            noteService.setToken(returnedUser.token);
            setUser(returnedUser);
            setUsername('');
            setPassword('');
        }
        catch (e) {
            console.log(e);
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }
    return (
        <form onSubmit={handleLogin}>
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
