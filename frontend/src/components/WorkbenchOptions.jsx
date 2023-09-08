import React, { useState } from "react";
import styled from "styled-components";
import { filters } from "../config/workbenchCards.js";
import Card from "./Card";

const Filter = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 70px;
`;

const Option = styled.h1`
  margin: 0 20px;
  cursor: pointer;
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
          <Option onClick={() => setSelectedTag(item)} key={item}>
            {item}
          </Option>
        ))}
      </Filter>
      {handleRenderCards()}
    </>
  );
};

export default WorkbenchOptions;
