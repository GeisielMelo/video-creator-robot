import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const User = styled.div`
  position: absolute;
  top: -8px;
  right: 0;
  margin: 20px;
  z-index: 2;
`;

const Menu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 1px 5px black;
  z-index: 2;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background-color: #b7b5b5;
`;

const Button = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 1px 5px ${(props) => (props["data-shadow"] ? "green" : "black")};
  background-color: transparent;
  color: #3b3b4f;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 1px 5px #6453e4;
  }
  &:disabled {
    cursor: default;
  }
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.h1`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-transform: capitalize;
  font-family: ${(props) => props.theme.font.family.one};
`;

const Email = styled.h2`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #b7b5b5;
  font-family: ${(props) => props.theme.font.family.one};
`;

const Option = styled.p`
  border: none;
  cursor: pointer;
  overflow: hidden;

  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  font-family: ${(props) => props.theme.font.family.two};

  &:hover {
    border-radius: 4px;
    padding-left: 10px;
  }
`;

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <User>
        <Button data-shadow={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Image>
            <AccountCircleIcon fontSize="large" />
          </Image>
        </Button>
      </User>

      {menuOpen && (
        <Menu ref={menuRef}>
          <Name>"User"</Name>
          <Email>Email</Email>
          <Line />
          <Option onClick={(e) => logout()}>Logout</Option>
        </Menu>
      )}
    </>
  );
};

export default Profile;
