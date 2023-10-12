import React from "react";
import styled from "styled-components";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Button = styled.button`
  position: absolute;
  top: -4px;
  right: 60px;
  margin: 20px;
  z-index: 2;
  background-color: transparent;
  cursor: pointer;
`;

const UpDownArrowBtn = ({ onClick }) => {
  const [isUp, setIsUp] = React.useState(true);

  const handleButtonClick = () => {
    onClick();
    setIsUp(!isUp);
  };
  return <Button onClick={handleButtonClick}>{isUp ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</Button>;
};

export default UpDownArrowBtn;
