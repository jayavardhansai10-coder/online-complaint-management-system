function NotificationItem({ notification, onRead }) {
  return (
    <div
      className={`p-2 border-bottom ${
        notification.isRead ? "bg-white" : "bg-light"
      }`}
      style={{ cursor: "pointer" }}
      onClick={() => onRead(notification._id)}
    >
      <div className="fw-semibold">
        {notification.message}
      </div>

      <small className="text-muted">
        {new Date(notification.createdAt).toLocaleString()}
      </small>
    </div>
  );
}

export default NotificationItem;