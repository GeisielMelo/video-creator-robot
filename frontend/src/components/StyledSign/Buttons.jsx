import styled from "styled-components";

export const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 72px;
  height: 72px;
  margin: 15px 0px;
  border-radius: 27px;
  cursor: pointer;

  background: rgb(213, 50, 53);
  color: rgb(252, 252, 252);
  &:disabled {
    border: 2px solid rgba(173, 173, 173, 0.3);
    background: transparent;
    color: rgb(173, 173, 173);
    cursor: not-allowed;
  }
`;

export const ChangePage = styled.button`
  position: fixed;
  bottom: 40px;

  max-width: max-content;
  width: 100%;
  font-family: ${(props) => props.theme.font.family.one};
  font-size: ${(props) => props.theme.font.size.sm};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #323238;
  padding-left: 2px;
  background: none;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
  @media (max-width: 600px) {
    position: static;
    padding-top: 20px;
  }
`;
