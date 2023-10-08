import { useState } from 'react';

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);
    const hideIfVisible = { display: visible ? 'none' : '' };
    const showIfVisible = { display: visible ? '' : 'none' };
    return (
        <>
            <button style={hideIfVisible} onClick={() => setVisible(!visible)}>{props.buttonLabel}</button>
            <div style={showIfVisible}>
                {props.children}
                <button onClick={() => setVisible(!visible)}>cancel</button>
            </div>
        </>
    );
}

export default Togglable;
