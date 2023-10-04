
const LoginForm = ({handleSubmit, handleUsernameChange, handlePasswordChange, username, password}) => {
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                username<input type='text' value={username} name='Username' onChange={handleUsernameChange} />
            </div>
            <div>
                password<input type='text' value={password} name='Password' onChange={handlePasswordChange} />
            </div>
            <input type='submit' value='login' />
        </form>
    );
}

export default LoginForm;
