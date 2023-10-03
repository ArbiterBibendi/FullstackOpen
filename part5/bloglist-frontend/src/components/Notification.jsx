import React from 'react';

const Notification = ({ notification }) => {
    const defaultStyle = { "border-color": "green", "color": "green" };
    const errorStyle = { "border-color": "red", "color": "red" };
    const style = notification.isError === true ? errorStyle : defaultStyle;
    if (!notification?.content) {
        return null;
    }
    return (
        <div className='notification' style={style}>
            {notification.content}
        </div>
    );
}

export default Notification;
