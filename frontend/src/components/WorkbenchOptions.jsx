import React, { useState } from "react";
import styled from "styled-components";
import { filters } from "../config/workbenchCards.js";
import Card from "./Card";

const Filter = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 70px;
  padding: 0 10px;

  border-radius: 12px;
  background-color: ${(props) => props.theme.color.White.default};
  box-shadow: 0 1px 3px ${(props) => props.theme.color.Blue.default};
`;

const Option = styled.h1`
  margin: 0 10px;
  padding: 10px;
  font-size: ${(props) => props.theme.font.size.es};
  font-weight: ${(props) => props.theme.font.weight.bold};
  text-transform: capitalize;
  cursor: pointer;
  border: ${(props) => (props.optionSelected ? `1px solid ${props.theme.color.Blue.default}` : "none")};
  border-radius: 8px;
`;

const WorkbenchOptions = () => {
  const tags = ["all", "copyright", "audio creation", "video creation", "picture creation"];
  const [selectedTag, setSelectedTag] = useState("all");

  const handleRenderCards = () => {
    const filteredCards = filters.filter((item) => item.tags.includes(selectedTag) || selectedTag === "all");

    return filteredCards.map((item, index) => (
      <Card key={index} title={item.title} description={item.description} buttonDescription={item.buttonDescription} url={item.url} />
    ));
  };

  return (
    <>
      <Filter>
        {tags.map((item) => (
          <Option optionSelected={selectedTag === item} onClick={() => setSelectedTag(item)} key={item}>
            {item}
          </Option>
        ))}
      </Filter>
      {handleRenderCards()}
    </>
  );
};

export default WorkbenchOptions;
