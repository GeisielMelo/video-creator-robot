import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { processQuiz } from "../../utils/StandardCreatonUtils";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px black;
  width: 100%;
  gap: 10px;
  padding: 20px;
  font-family: ${(props) => props.theme.font.family.one};
  textarea {
    width: 100%;
    background-color: #f1f1f2;
    border: 1px solid rgba(212, 213, 216, 255);
    border-radius: 6px;
    padding: 10px;
    resize: none;
    font-family: ${(props) => props.theme.font.family.two};
  }
  button {
    height: 40px;
    border-radius: 6px;
    background-color: #1abc9c;
    color: white;
    transition: all 0.2s ease-in-out;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 5px #1abc9cb7;
      background-color: #1abc9cb9;
    }
    &:disabled {
      background-color: #f1f1f2;
      cursor: not-allowed;
      box-shadow: none; 
      color: #8ea1a8;
    }
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  background-color: #f1f1f2;
  border-radius: 6px;
  p {
    width: 100%;
    font-size: 12px;
  }
  div {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${(props) =>
      props["data-stage"] === "added"
        ? "#8ea1a8"
        : props["data-stage"] === "processing"
        ? "#f1c40f"
        : props["data-stage"] === "done"
        ? "#2ecc71"
        : "#e74c3c"}
  }
`;

const StandardCreation = () => {
  const [quizList, setQuizList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (quizInput) => {
    try {
      const quizJSON = processQuiz(quizInput);
      setQuizList((prevList) => [...prevList, { ...quizJSON, stage: "added" }]);
      setInputValue("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Section>
      <Container>
        <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Quiz" cols="30" rows="5"></textarea>
        <button disabled={quizList.length >= 6} onClick={() => handleSubmit(inputValue)}>
          <AddIcon />
        </button>

        {quizList.map((quiz, index) => (
          <ListContainer data-stage={quiz.stage} key={index}>
            <p>{quiz.question}</p>
            <div />
          </ListContainer>
        ))}
      </Container>
    </Section>
  );
};

export default StandardCreation;
