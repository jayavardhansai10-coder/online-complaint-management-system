import NotificationItem from "./NotificationItem";

function NotificationDropdown({
  notifications,
  markAsRead,
}) {
  return (
    <div
      className="card shadow position-absolute"
      style={{
        width: "350px",
        right: "0",
        top: "45px",
        zIndex: 1000,
      }}
    >
      <div className="card-header fw-bold">
        Notifications
      </div>

      <div
        style={{
          maxHeight: "350px",
          overflowY: "auto",
        }}
      >
        {notifications.length === 0 ? (
          <div className="p-3 text-center">
            No Notifications
          </div>
        ) : (
          notifications.map((n) => (
            <NotificationItem
              key={n._id}
              notification={n}
              onRead={markAsRead}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationDropdown;