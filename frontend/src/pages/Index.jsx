import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.theme.color.Navy.default};
  height: 30px;
  padding: 5px 10px;
`;

const Index = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Section>
      <h1>Hello World</h1>
      <Button onClick={(e) => logout()}>Logout</Button>
    </Section>
  );
};

export default Index;
