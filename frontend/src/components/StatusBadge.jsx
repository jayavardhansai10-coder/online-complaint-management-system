function StatusBadge({ status }) {

  let color = "secondary";

  if (status === "Pending")
    color = "warning";

  if (status === "In Progress")
    color = "primary";

  if (status === "Resolved")
    color = "success";

  return (
    <span className={`badge bg-${color}`}>
      {status}
    </span>
  );

}

export default StatusBadge;