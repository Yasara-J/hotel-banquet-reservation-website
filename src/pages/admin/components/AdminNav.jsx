import { NavLink } from "react-router-dom";
import "../../../components/Navbar.css";

export default function AdminNav() {
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminId");
    window.location.href = "/admin";
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to={"/admin/dashboard"}>
          <h5 className="fw-bold">Holiday Inn Admin</h5>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-1 align-items-center">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
                to="admin/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
                to="admin/reservations"
              >
                Reservations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
                to="admin/roomsAndHalls"
              >
                Rooms & Halls
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
                to="admin/report"
              >
                Report and analytics
              </NavLink>
            </li>
            <li className="nav-item" title="Settings">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-primary mt-0 nav-link active text-white"
                    : "nav-link"
                }
                to="admin/settings"
              >
                <i className="bi bi-gear"></i>
              </NavLink>
            </li>
            <li className="nav-item" title="Logout">
              <button
                type="button"
                className="btn btn-danger bg-danger m-0"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
