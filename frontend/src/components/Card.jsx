import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 420px;
  max-height: 180px;
  width: 100%;
  height: 100%;
  margin: 20px 0;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.color.White.default};
  box-shadow: 0 1px 3px ${(props) => props.theme.color.Blue.default};
  cursor:  pointer;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.font.size.sm};
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.font.size.sm};
  margin: 20px 0;
`;

const Action = styled.p`
  font-size: ${(props) => props.theme.font.size.sm};
  color: ${(props) => props.theme.color.Blue.default};
`;

const Card = ({ title, description, buttonDescription, url }) => {
  const navigate = useNavigate();
  
  return (
    <Container onClick={() => navigate(`${url}`)}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Action>{buttonDescription}</Action>
    </Container>
  );
};

export default Card;
