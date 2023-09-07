import React from "react";
import styled from "styled-components";
import Profile from "../components/Profile";

const App = styled.section`
  display: flex;
  height: 100vh;
`;

const Menu = styled.div`
  max-width: 200px;
  width: 100%;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.color.Navy.Lightest};
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

const Workbench = ({ children }) => {
  return (
    <App>
      <Menu>Menu</Menu>
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
