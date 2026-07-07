import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaUserCog,
  FaChartPie,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;
  console.log("Current User:", user);
  console.log("Current Role:", role);

  const menus = [];

if (role === "USER") {

  menus.push(
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Create Complaint",
      path: "/complaint",
      icon: <FaClipboardList />,
    },
    {
      name: "My Complaints",
      path: "/mycomplaints",
      icon: <FaClipboardList />,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <FaUser />,
    }
  );

}

 if (role === "ADMIN") {

  menus.push(
    {
      name: "Admin Dashboard",
      path: "/admin",
      icon: <FaUsers />,
    },
    {
      name: "User Management",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartPie />,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <FaUser />,
    }
  );

}
  if (role === "AGENT") {

  menus.push(
    {
      name: "Agent Dashboard",
      path: "/agent",
      icon: <FaUserCog />,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <FaUser />,
    }
  );

}
  return (

    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#1e293b",
      }}
      className="text-white shadow"
    >

      <div className="text-center py-4 border-bottom">

        <h3>CMS</h3>

      </div>

      {menus.map((menu) => (

        <Link
          key={menu.path}
          to={menu.path}
          className={`d-flex px-4 py-3 text-decoration-none ${
            location.pathname === menu.path
              ? "bg-primary text-white"
              : "text-light"
          }`}
        >

          <span className="me-3">

            {menu.icon}

          </span>

          {menu.name}

        </Link>

      ))}

      <Link
        to="/login"
        className="d-flex px-4 py-3 text-light text-decoration-none"
        onClick={() => {

          localStorage.removeItem("token");
          localStorage.removeItem("user");

        }}
      >

        <span className="me-3">

          <FaSignOutAlt />

        </span>

        Logout

      </Link>
      
      
    </div>

  );

}

export default Sidebar;