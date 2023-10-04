import { useState } from "react";

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
    const [loginVisible, setLoginVisible] = useState(false);

    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };
    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={() => setLoginVisible(true)}>log in</button>
            </div>
            <div>

                <div style={showWhenVisible}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            username<input type='text' value={username} name='Username' onChange={handleUsernameChange} />
                        </div>
                        <div>
                            password<input type='text' value={password} name='Password' onChange={handlePasswordChange} />
                        </div>
                        <input type='submit' value='login' />
                        <button onClick={() => setLoginVisible(false)}>cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
