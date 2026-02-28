import { useEffect, useState } from "react";
import "../styles/updatingModal.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function MyComponent({ isOpen, onClose, userData, fetchUsers }) {
  const { AuthorizationToken, API } = useAuth();

  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
  });

  // jab selectedUser change ho tab modal me data set karo
  useEffect(() => {
    if (userData) {
      setData({
        name: userData.username || "",
        email: userData.email || "",
        number: userData.number || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${API}/api/admin/users/update/${userData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        await fetchUsers();
        toast.success("Updated Successfully")
        onClose();     
      }else{
        toast.error("Fail to Update")
      }
    } catch (error) {
      console.log("Update error", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit User</h2>

        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="text"
          name="number"
          value={data.number}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <div>
          <button onClick={handleUpdate} type="button">Update</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}