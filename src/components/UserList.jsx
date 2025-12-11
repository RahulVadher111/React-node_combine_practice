import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const UserList = () => {
  const { users, addUser, updateUser, deleteUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      updateUser(editId, formData);
      setEditId(null);
    } else {
      addUser(formData);
    }

    setFormData({ name: "", email: "", age: "" });
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
    });
  };

  return (
    <div style={{ width: "80%", margin: "50px auto", paddingTop: "50px" }}>
      <h1>User List</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          style={{ padding: "10px" }}
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          style={{ padding: "10px" }}
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          style={{ padding: "10px" }}
          type="number"
          name="age"
          placeholder="Enter age"
          value={formData.age}
          onChange={handleChange}
        />
        <button type="submit" style={{ padding: "10px" }}>
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      {users.length === 0 ? (
        <p>No Users Found</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    style={{ marginRight: "5px" }}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
