import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
padding: 20px;
maxWidth: 800px;
margin: 0 auto;
fontFamily: Arial, sans-serif;
`;
 
const List = styled.ul`
listStyleType: none;
padding: 0;
`;

const Listitem = styled.li`
background: #f1f1f1;
padding: 15px;
marginBottom: 10px;
border: 1px solid red;
borderRadius: 8px;
boxShadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const UserList = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setListOfUsers(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Wrapper>
      <h2>User List</h2>
      {isLoading ? (
        <ClipLoader color="red" loading={isLoading} size={50} />
      ) : error ? (
        <p>Error fetching users: {error.message}</p>
      ) : (
        <List>
          {listOfUsers.map(user => (
            <Listitem key={user.id}>
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> {user.website}</p>
            </Listitem>
          ))}
        </List>
      )}
    </Wrapper>
  );
};



export default UserList;
