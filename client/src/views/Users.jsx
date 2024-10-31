import React, { useEffect, useState } from "react";
import { axiosApi } from "../axiosClient";
import { Link } from "react-router-dom";
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axiosApi
      .get("/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  console.log(users);

  if (!users.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No emails found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col underline">
      {users.map((user) => (
        <Link to={`/users/${user.id}`} key={user.id}>{`${user.firstName} ${user.lastName} `}</Link>
      ))}
    </div>
  );
}

export default Users;
