import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState();
    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    }
    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    });
    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </>
    );
})

Togglable.displayName = 'Togglable';
export default Togglable;
