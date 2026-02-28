import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "../styles/adminUsers.css";
import MyComponent from "./updatingDialouge";
import { toast } from "react-toastify";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const { AuthorizationToken, API } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      const data = await response.json();
      console.log("Users:", data);

      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUserByID = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      console.log("Users:", data);
      if (response.ok) {
        toast.success("Deleted Successfully");
        fetchUsers();
      } else {
        toast.error("Fail to Delete");
      }
    } catch (error) {
      console.log("Error from delete Section", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [AuthorizationToken]);
  useEffect(() => {
    console.log("Modal state changed:", isModalOpen);
  }, [isModalOpen]);

  return (
    <div className="admin-users-container">
      <h2>All Registered Users</h2>
      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUserByID(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MyComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={selectedUser}
        fetchUsers={fetchUsers}
      />
    </div>
  );
}
