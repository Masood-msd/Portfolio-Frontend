import { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function Login() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLs, API } = useAuth();
   function handledetails(e) {
    const name = e.target.name;
    const value = e.target.value;

    setDetails({
      ...details,
      [name]: value,
    });
  }
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(details),
      });
      if (details.email.length === 0 && details.password.length === 0) {
        return toast.warning("Fields cannot be empty");
      }
      const data = await res.json();
      if (res.ok) {
        toast.success("Login Successful");
        storeTokenInLs(data.token, data.isAdmin);
        setDetails({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (err) {
      console.error("Login error", err.message);
      toast.error(err.message);
    }
  };
  return (
    <>
      <main className="loginpage">
        <div>
          <img
            src="/login.png"
            alt="Login Vector Art"
            style={{ height: 350, width: 350 }}
          />
        </div>
        <div className="login-box">
          <div>
            <h1>Login</h1>
          </div>
          <div className="input-div">
            <form className="form" onSubmit={handlelogin}>
              <label htmlFor="email" className="">
                Email
              </label>
              <div className="login-form">
                <input
                  type="text"
                  name="email"
                  value={details.email}
                  id="email"
                  placeholder="Enter your registered email"
                  autoComplete="off"
                  className=" form-control"
                  onChange={handledetails}
                />
              </div>
              <label htmlFor="password">Password</label>
              <div className="login-form">
                <input
                  type="password"
                  name="password"
                  value={details.password}
                  id="password"
                  placeholder="Enter password"
                  autoComplete="off"
                  className=" form-control"
                  onChange={handledetails}
                />
              </div>
              <button type="submit" className="login-btn btn  mt-4">
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
