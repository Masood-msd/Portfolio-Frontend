import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import "../styles/adminMessages.css";
import { toast } from "react-toastify";

export default function AllMessages() {
  const [messages, setMessages] = useState([]);
  const { AuthorizationToken, API } = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                          fetching data of messages                          */
  /* -------------------------------------------------------------------------- */
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contact`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setMessages(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              deleting messages                             */
  /* -------------------------------------------------------------------------- */
  const deleteMessageByID = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/contact/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationToken,
          },
        },
      );
      const data = await response.json();
      console.log("Message:", data);
      if (response.ok) {
          toast.success("Deleted Successfully")
        fetchMessages();
      }else{
          toast.error("Fail to delete")
      }
    } catch (error) {
      console.log("Error from delete Section", error);
    }
  };

  useEffect(() => {
    if (AuthorizationToken) {
      fetchMessages();
    }
  }, [AuthorizationToken]);

  return (
    <div className="messages-container">
      <h2>Contact Messages</h2>

      <div className="cards-grid">
        {messages.map((msg) => (
          <div className="message-card" key={msg._id}>
            <div className="card-header">
              <h3>{msg.username}</h3>
              <p className="email">{msg.email}</p>
            </div>

            <p className="message-text">{msg.message}</p>

            <div className="card-footer">
              <button className="delete-btn" onClick={() => deleteMessageByID(msg._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
