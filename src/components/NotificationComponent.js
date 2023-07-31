import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Replace 'http://localhost:5000' with the URL of your socket.io server
    const socket = io('http://localhost:3001');

    // Replace 'newNotification' with the name of your custom event from the server
    socket.on('newNotification', (data) => {
      // Handle the received notification data and update the state
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Real-time Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
