import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface User {
  id: string;
  name: string;
  email: string;
}

function ListUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");
      const {
        data: { users },
      } = await api.get("/listUsers", {
        headers: { Authorization: "Bearer " + token },
      });
      setAllUsers(users);
    }
    loadUsers();
  }, []);

  if (allUsers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="divList">
      <h2 className="h2List">List of Users</h2>
      <ul className="ulList">
        {allUsers &&
          allUsers.length > 0 &&
          allUsers.map((user) => (
            <li className="liList" key={user.id}>
              <p>- ID: {user.id}</p>
              <p>- Name: {user.name}</p>
              <p>- Email: {user.email}</p>
            </li>
          ))}
      </ul>
      <button className="buttonList">
        <Link to="/login" className="linkList">
          Turn back to login
        </Link>
      </button>
    </div>
  );
}

export default ListUsers;
