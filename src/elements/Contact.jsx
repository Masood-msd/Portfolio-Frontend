/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import "../styles/contact.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";


export default function contact() {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { user, API } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  if (user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
  }
}, [user]);

  function HandleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  }
  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(contact),
      });

      const data = await res.json();

      if (res.ok) { 
      alert("Feedback submitted successfully");
      setContact({ username: "", email: "", message: "" });
      navigate("/");
      }
       alert(data.message || "Something went wrong . Please try again");
        navigate("/contact");

    } catch (err) {
      console.log(err.message || "Contact error")
      alert(err.message)
    }
  };
 

  return (
    <main className="contact-page">
      <section className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p>
            I'm open to internships, projects, and full-time opportunities. Feel
            free to contact me for collaboration or feedback.
          </p>

          {/* <div className="contact-details">
            <p> <a href="http://mail.google.com/mail/u/0/#inbox?compose=new">masoodsd2004@gmail.com</a></p>
            <p> India</p>
          </div> */}
        </div>

        {/* Right Form */}
        <div className="contact-form">
          <form onSubmit={handleContact}>
            <input
              type="text"
              value={contact.username}
              autoComplete="off"
              onChange={HandleInput}
              name="username"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              value={contact.email}
              autoComplete="off"
              onChange={HandleInput}
              name="email"
              placeholder="Your Email"
              required
            />

            <textarea
              name="message"
              value={contact.message}
              autoComplete="off"
              onChange={HandleInput}
              placeholder="Your Message"
              rows="5"
            ></textarea>

            <button type="button">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
}
