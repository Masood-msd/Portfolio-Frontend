import { useState } from "react";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function Register() {
  const [user, setuser] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs, API } = useAuth();
  function Handlevalues(e) {
    const values = e.target.value;
    const name = e.target.name;
    setuser({
      ...user,
      [name]: values,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if((user.username && user.email && user.number && user.password).length === 0){
        toast.error("All fields are required")
      }
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.log("Server did not return JSON: " + text);
      }

      const data = await response.json();

      if (response.ok) {
        storeTokenInLs(data.token);
        toast.success("Registration Successful");
        setuser({ username: "", email: "", number: "", password: "" });
        navigate("/");
      }else{
        toast.error(data.extraDetails ? data.extraDetails: data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error(error || "Registration failed");
    }
  };
  return (
    <>
      <main className="registerpage">
        <div className="rgsrt-img">
          <img
            src="/Registration.png"
            alt="Registration form Image"
            style={{ height: 400, width: 420 }}
          />
        </div>
        <div className="registration-form">
          <div>
            <h1>Registration</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="lable-div">
              <label htmlFor="username">Username</label>
              <div className="form-lable">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={user.username}
                  autoComplete="off"
                  placeholder="Enter Username here"
                  onChange={Handlevalues}
                  className="form-control reg-box"
                />
              </div>
            </div>
            <div className="lable-div">
              <label htmlFor="email">Email</label>
              <div className="form-lable">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  autoComplete="off"
                  placeholder="Enter Email here"
                  onChange={Handlevalues}
                  className="form-control reg-box"
                />
              </div>
            </div>
            <div className="lable-div">
              <label htmlFor="number">Phone Number</label>
              <div className="form-lable">
                <input
                  type="number"
                  name="number"
                  id="number"
                  value={user.number}
                  autoComplete="off"
                  placeholder="Enter Mobile here"
                  onChange={Handlevalues}
                  className="form-control reg-box"
                />
              </div>
            </div>
            <div className="lable-div">
              <label htmlFor="password">Password</label>
              <div className="form-lable">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                  autoComplete="off"
                  placeholder="Password Here"
                  onChange={Handlevalues}
                  className="form-control reg-box"
                />
              </div>
            </div>
            <button className="btn btn-danger submit-btn" type="submit">
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
