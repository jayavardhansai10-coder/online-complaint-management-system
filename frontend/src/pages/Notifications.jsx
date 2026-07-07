import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MainLayout from "../layouts/MainLayout";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../services/notificationService";
import socket from "../services/socket";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
  loadNotifications();

  socket.on("notification", (data) => {
    console.log("Notification Received:", data);
    loadNotifications();
  });

  return () => {
    socket.off("notification");
  };
}, []);
  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      Swal.fire({
        icon: "success",
        title: "Notification marked as read",
        timer: 1000,
        showConfirmButton: false,
      });

      loadNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllAsRead();

      Swal.fire({
        icon: "success",
        title: "All notifications marked as read",
        timer: 1000,
        showConfirmButton: false,
      });

      loadNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Notifications</h2>

          <button
            className="btn btn-primary"
            onClick={handleReadAll}
          >
            Mark All as Read
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="alert alert-info">
            No notifications found.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`card shadow-sm mb-3 ${
                item.isRead ? "" : "border-primary"
              }`}
            >
              <div className="card-body">

                <div className="d-flex justify-content-between">

                  <div>

                    <h5>{item.message}</h5>

                    <small className="text-muted">
                      {new Date(item.createdAt).toLocaleString()}
                    </small>

                  </div>

                  <div>

                    {item.isRead ? (
                      <span className="badge bg-success">
                        Read
                      </span>
                    ) : (
                      <>
                        <span className="badge bg-danger me-2">
                          Unread
                        </span>

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleRead(item._id)}
                        >
                          Mark Read
                        </button>
                      </>
                    )}

                  </div>

                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </MainLayout>
  );
}

export default Notifications;