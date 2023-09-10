import React from 'react';

const Notification = ({ notification }) => {
    if (notification.message === '') {
        return null;
    }
    const color = notification.isError ? 'red' : 'green';
    const style = {
        color
    };
    return (
        <div style={style} className='notification'>
            {notification.message}
        </div>
    );
}

export default Notification;
