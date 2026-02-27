import "../styles/nav.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <header className="head">
      {/* Brand */}
      <div className="brand-name">
        <span className="bi bi-code-slash logo"></span>
        <span className="name">Masood </span>
        <span className="title">Ahmed Syed</span>
      </div>

      {/* Hamburger */}
      <div className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* Nav Links */}
      <nav className={`tabs ${open ? "open" : ""}`} role="navigation">
        <ul className="UL">
          <li>
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/About" onClick={() => setOpen(false)}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/work" onClick={() => setOpen(false)}>
              My Work
            </NavLink>
          </li>

          <li>
            <NavLink to="/Contact" onClick={() => setOpen(false)}>
              Contact
            </NavLink>
          </li>

          {isLoggedIn ?  
          (
            <li>
              <NavLink to="/logout" onClick={() => setOpen(false)}>
                Logout
              </NavLink>
            </li>
          ) : 
          (
            <>
              <li>
                <NavLink to="/Login" onClick={() => setOpen(false)}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/Register" onClick={() => setOpen(false)}>
                  Register
                </NavLink>
              </li>
            </>
          )
        }
        </ul>
      </nav>
    </header>
  );
}
