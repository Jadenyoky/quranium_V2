import React, { useEffect, useState } from "react";
import Styles from "./home.module.css";
import { getUsers, getUserById } from "../../api";
import { Button } from "@mui/material";

const Index = () => {
  const [user, setuser] = useState([]);
  const [id, setid] = useState([]);
  const fetchUsers = async () => {
    const data = await getUsers();
    setuser(data);
    console.log(data);
  };

  const userId = async (id) => {
    const data = await getUserById(id);
    setid(data);
    console.log(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {user.map((user) => (
          <li key={user.id}>
            {user.name}
            <Button onClick={() => userId(user.id)}>To data by user</Button>
            <br />
          </li>
        ))}
      </ul>

      <p>
        <b>Name:</b> {id.name}
        <br />
        <b>Username:</b> {id.username}
        <br />
        <b>Email:</b> {id.email}
        <br />
        <b>Phone:</b> {id.phone}
        <br />
        <b>Website:</b> {id.website}
      </p>
    </div>
  );
};

export default Index;
