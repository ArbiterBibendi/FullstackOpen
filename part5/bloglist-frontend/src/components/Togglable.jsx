import { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ children, hideLabel, showLabel }) => {
    const [visible, setVisible] = useState(false);
    const hideIfVisible = { display: visible ? 'none' : '' };
    const showIfVisible = { display: visible ? '' : 'none' };
    return (
        <>
            <button style={hideIfVisible} onClick={() => setVisible(!visible)}>{showLabel}</button>
            <button style={showIfVisible} onClick={() => setVisible(!visible)}>{hideLabel ? hideLabel : 'cancel'}</button>
            <div style={showIfVisible}>
                {children}
            </div>
        </>
    );
}
Togglable.propTypes = {
    hideLabel: PropTypes.string.isRequired,
    showLabel: PropTypes.string.isRequired,
}

export default Togglable;
