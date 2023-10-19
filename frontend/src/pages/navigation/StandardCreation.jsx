import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import _isEqual from "lodash/isEqual";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DownloadIcon from "@mui/icons-material/Download";
import { Loading } from "../../components/Loading";
import { processQuiz } from "../../utils/StandardCreationUtils";
import { createQuiz, downloadImage, indexQuestions, createQuestions } from "../../services/api";

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
    &:disabled {
      cursor: not-allowed;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 6px;
    background-color: #1abc9c;
    color: white;
    transition: all 0.2s ease-in-out;
    margin: 10px 0px;
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
`;

const StandardCreation = () => {
  const { user } = useContext(AuthContext);
  const [userQuestions, setUserQuestions] = useState(null);
  const [quizList, setQuizList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [operationFinished, setOperationFinished] = useState(false);
  const [enableDownload, setEnableDownload] = useState(false);

  useEffect(() => {
    if (!userQuestions) {
      const fetchData = async () => {
        try {
          const response = await indexQuestions(user.id);
          setUserQuestions(response.data);
        } catch (error) {
          console.error("No data found.");
          setUserQuestions([]);
        }
      };
      fetchData();
    }
  }, [userQuestions]);

  const handleAddQuiz = async (quizInput) => {
    try {
      // Filter input from text area using regEx.
      const quizJSON = processQuiz(quizInput);

      // Checks if the question has been used before.
      if (userQuestions.includes(quizJSON.question)) {
        alert("Question already used.");
        throw new Error("Question already used.");
      }

      // Checks if the quiz has already been added.
      if (quizList.some((quiz) => _isEqual(quiz.question, quizJSON.question))) {
        alert("Quiz already added.");
        throw new Error("Quiz already added.");
      }

      // Adds the quiz to the quiz list.
      setQuizList((prevList) => [...prevList, quizJSON]);
      setInputValue("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    let newQuestions = [];

    quizList.forEach((quiz) => {
      newQuestions.push(quiz.question);
    });

    try {
      // Make the quiz components on the backend and return a download file.
      await createQuiz(quizList, user.id);
      // Create a record of the questions used.
      await createQuestions(user.id, newQuestions);
      // Rest of the code.
      setOperationFinished(true);
      setEnableDownload(true);
      console.log("Complete");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsProcessing(false);
      console.log("stopping processing");
    }
  };

  return (
    <Section>
      <Container>
        <textarea
          disabled={isProcessing || operationFinished}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Quiz"
          cols="30"
          rows="5"
        ></textarea>
        <button disabled={quizList.length >= 6 || isProcessing || operationFinished} onClick={() => handleAddQuiz(inputValue)}>
          <AddIcon />
        </button>

        {quizList.map((quiz, index) => (
          <ListContainer key={index}>
            <p>{quiz.question}</p>
            {!isProcessing && !operationFinished && (
              <RemoveCircleIcon color="error" fontSize="small" onClick={() => setQuizList(quizList.filter((_, i) => i !== index))} />
            )}
          </ListContainer>
        ))}

        {quizList.length != 0 && (
          <button disabled={isProcessing || operationFinished} onClick={() => handleSubmit()}>
            {isProcessing ? <Loading /> : <PlayArrowIcon />}
          </button>
        )}
        {enableDownload && (
          <button
            onClick={async () => {
              await downloadImage(user?.id);
            }}
          >
            <DownloadIcon />
          </button>
        )}
      </Container>
    </Section>
  );
};

export default StandardCreation;
