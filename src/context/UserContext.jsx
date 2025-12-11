import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const res = await axios.post("http://localhost:5000/users", newUser);
      setUsers((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (id, updateData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/users/${id}`,
        updateData
      );
      setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
