import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 420px;
  max-height: 180px;
  width: 100%;
  height: 100%;
  margin: 20px 0;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.font.size.sm};
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.font.size.es};
`;

const Button = styled.button`
  font-size: ${(props) => props.theme.font.size.es};
`;

const Card = ({ title, description, buttonDescription, url }) => {
  const navigate = useNavigate();
  
  return (
    <Container onClick={() => navigate(`${url}`)}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Button>{buttonDescription}</Button>
    </Container>
  );
};

export default Card;
