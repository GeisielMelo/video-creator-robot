import React from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const App = styled.section`
  display: flex;
  height: 100vh;
`;

const Menu = styled.div`
  max-width: 200px;
  width: 100%;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.color.Navy.Lightest};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: ${(props) => props.theme.color.Blue.Lightest};
`;

const Navbar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: 1px solid ${(props) => props.theme.color.Navy.Lightest};
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.font.size.sm};
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 10px;
`;

const Button = styled.button`
  width: 170px;
  height: 40px;
  margin: 5px 0;
  border-radius: 8px;
  background-color: transparent;
  color: ${(props) => props.theme.color.Blue.default};
  font-size: ${(props) => props.theme.font.size.sm};
  font-weight: ${(props) => props.theme.font.weight.bold};
  border: 1px solid ${(props) => props.theme.color.Blue.default};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.Blue.Lightest};
  }
`;

const Workbench = ({ children }) => {
  const navigate = useNavigate();
  return (
    <App>
      <Menu>
        <Logo src={logo} onClick={() => navigate("/")} />
        <Button onClick={() => navigate("/ai/workbench")}>Create</Button>
        <Button onClick={() => navigate("/ai/projects")}>Projects</Button>
      </Menu>
      <Wrapper>
        <Navbar>
          <Title>DB Digital Components Creation</Title>
          <Profile />
        </Navbar>
        <Content>{children}</Content>
      </Wrapper>
    </App>
  );
};

export default Workbench;
