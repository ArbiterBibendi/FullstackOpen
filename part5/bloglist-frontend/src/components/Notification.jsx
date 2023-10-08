import React from 'react';

const Notification = ({ notification }) => {
    const defaultStyle = { "borderColor": "green", "color": "green" };
    const errorStyle = { "borderColor": "red", "color": "red" };
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
