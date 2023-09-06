import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../services/api";

const Menu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.White.default};
  box-shadow: 0 1px 5px ${(props) => props.theme.color.Navy.default};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background-color: ${(props) => props.theme.color.White.default};
`;

const Button = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 1px 5px ${(props) => props.theme.color.Navy.default};
  background-color: transparent;
`;

const Name = styled.h1`
  font-family: ${(props) => props.theme.font.family.one};
  font-size: ${(props) => props.theme.font.size.sm};
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-transform: capitalize;
`;

const Email = styled.h2`
  font-family: ${(props) => props.theme.font.family.one};
  font-size: ${(props) => props.theme.font.size.es};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${(props) => props.theme.color.Slate.Lightest};
`;

const Option = styled.p`
  border: none;
  cursor: pointer;
  overflow: hidden;

  font-family: ${(props) => props.theme.font.family.one};
  font-size: ${(props) => props.theme.font.size.es};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  &:hover {
    background-color: ${(props) => props.theme.color.Slate.Lightest};
    border-radius: 4px;
    padding-left: 10px;
  }
`;

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userData) {
      const fetchData = async () => {
        try {
          const response = await fetchUserData(user.id);
          setUserData(response.data);
        } catch (error) {
          console.log("Error on fetch user Data.");
        }
      };
      fetchData();
    }
  }, [user, userData]);

  return (
    <>
      <Button onClick={(e) => setMenuOpen(!menuOpen)}>{userData ? userData.name[0].toUpperCase() : "null"}</Button>

      {menuOpen && userData !== null && (
        <Menu>
          <Name>
            {userData.name} {userData.lastName}
          </Name>
          <Email>{user.email}</Email>
          <Line />
          <Option onClick={(e) => logout()}>Logout</Option>
        </Menu>
      )}
    </>
  );
};

export default Profile;
