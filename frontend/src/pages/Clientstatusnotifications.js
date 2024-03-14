import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Make an API request to fetch notifications for the current user
      const response = await axios.get('http://43.204.201.158:8000/notifications/');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>
            {notification.approved ? 'Client Approved:' : 'Client Rejected:'} {notification.client_registration.entityName}
          </p>
          {notification.rejection_reason && (
            <p>Reason for Rejection: {notification.rejection_reason}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
