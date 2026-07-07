import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import API from "../services/api";
import NotificationDropdown from "./notifications/NotificationDropdown";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await API.get("/notifications");

      setNotifications(res.data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}`);

      loadNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  const unread = notifications.filter(
    (n) => !n.isRead
  ).length;

  return (
    <div className="position-relative me-4">
      <FaBell
        size={22}
        style={{ cursor: "pointer" }}
        onClick={() => setShow(!show)}
      />

      {unread > 0 && (
        <span
          className="badge bg-danger rounded-pill position-absolute"
          style={{
            top: "-8px",
            right: "-8px",
          }}
        >
          {unread}
        </span>
      )}

      {show && (
        <NotificationDropdown
          notifications={notifications}
          markAsRead={markAsRead}
        />
      )}
    </div>
  );
}

export default NotificationBell;