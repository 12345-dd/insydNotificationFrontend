import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

const NotificationList = ({ userId, socket, refreshKey }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`https://insydbackend-xz0o.onrender.com/events/${userId}`);
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId, refreshKey]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newNotification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => socket.off("newNotification");
  }, [socket]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notif) => (
          <ListItem key={notif._id} divider>
            <ListItemText
              primary={notif.content}
              secondary={new Date(notif.timestamp).toLocaleString()}
            />
          </ListItem>
        ))}
        {notifications.length === 0 && (
          <Typography variant="body2">No notifications yet.</Typography>
        )}
      </List>
    </>
  );
};

export default NotificationList;



