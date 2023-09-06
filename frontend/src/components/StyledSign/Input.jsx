import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
  max-height: 50px;
  height: 100%;
  width: 100%;
  margin: 8px;
`;

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 4px;
  
  background: #ededed;
  box-sizing: border-box;
  padding: 31px 10px 15px;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #323238;
  &:hover {
    border: 2px solid rgba(173, 173, 173, 0.3);
  }
`;

const InputLabel = styled.label`
  position: absolute;
  top: ${(props) => (props.hasInput ? "15px" : "50%")};
  left: 10px;
  transform: translateY(-50%);
  transition: top 0.1s, font-size 0.1s;
  font-size: ${(props) => (props.hasInput ? "10px" : "12px")};
  color: #999;
`;

const Input = ({ type, value, disabled, placeholder, onChange, autoComplete }) => {
  const [move, setMove] = useState(false);

  return (
    <InputContainer>
      <StyledInput
        type={type}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e)}
        onFocus={() => setMove(true)}
        onBlur={(e) => !e.target.value ? setMove(false) : setMove(true)}
      />
      <InputLabel hasInput={move}>{placeholder}</InputLabel>
    </InputContainer>
  );
};

export default Input;
