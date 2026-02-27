import { useAuth } from "../store/auth";
import "../styles/adminpannel.css";
import { NavLink, Outlet, Navigate} from "react-router-dom";

export default function AdminPanel() {
  const { user, isLoading } = useAuth()

  if(isLoading){
    return <h1>Load hone tho doo🤬🤬</h1>
  }
  if(!user.isAdmin){
    return <Navigate to="/" />
  }
  return (
    <section className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin Panel</h2>

        <nav>
          <NavLink to="/admin/users" className="admin-link">
            Users
          </NavLink>

          <NavLink to="/admin/contacts" className="admin-link">
            Messages
          </NavLink>

          <NavLink to="/" className="admin-link">
            Home
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <span>Welcome, Admin</span>
          <button className="logout-btn"><NavLink className="logout-button" to="/logout">Logout</NavLink></button>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}