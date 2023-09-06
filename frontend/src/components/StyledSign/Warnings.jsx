import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 50px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 350px;
  width: 100%;
  height: 45px;
  background-color: ${(props) => props.color};
`;

const Text = styled.p`
  font-family: ${(props) => props.theme.font.family.one};
  font-size: ${(props) => props.theme.font.size.sm};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${(props) => props.theme.color.white};
`;

const Warning = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return visible ? (
    <Container
      color={
        type === "error"
          ? "#e5545185"
          : type === "warning"
          ? "#f2ae5c84"
          : type === "success"
          ? "#6cc07086"
          : "black"
      }
    >
      <Text>{message}</Text>
    </Container>
  ) : null;
};

export default Warning;
