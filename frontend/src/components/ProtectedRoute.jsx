import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role) {

    if (Array.isArray(role)) {

      if (!role.includes(user?.role)) {
        return <Navigate to="/" />;
      }

    } else {

      if (user?.role !== role) {
        return <Navigate to="/" />;
      }

    }

  }

  return children;
}

export default ProtectedRoute;