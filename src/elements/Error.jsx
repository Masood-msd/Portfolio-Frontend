import { NavLink } from "react-router-dom";
import '../styles/error.css'

export default function ErrorPage() {
  return (

    <main className="error-page">

      <div className="error-box">

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for does not exist
          or has been moved.
        </p>

        <NavLink to="/" className="error-btn">
          Go Back Home
        </NavLink>

      </div>

    </main>
  );
}
