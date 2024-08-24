"use client";
import { useState } from "react";
import styled from "styled-components";
import { Difficulty } from "../types/difficulty";

// Styled components
const FilterContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  border-radius: 10px;
`;

const FilterButton = styled.button<{ $active: string }>`
  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  border: 2px solid;
  background-color: white;
  border-color: ${(props) =>
    props.$active === "true" ? "#4f9aef" : "#d3d3d3"};
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #d3d3d3;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
`;

const FilterInfo = styled.p`
  color: #606060;
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4f9aef;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  vertical-align: middle;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface FilterContainerProps {
  filter: Difficulty | null;
  setFilter: (difficulty: Difficulty | null) => void;
}

export default function FilterContainer({
  filter,
  setFilter,
}: FilterContainerProps) {
  const [loadingDifficulty, setLoadingDifficulty] = useState<Difficulty | null>(
    null
  );
  const handleFilterClick = (difficulty: Difficulty) => {
    setLoadingDifficulty(difficulty);
    // Simulate an API call or data fetching delay
    setTimeout(() => {
      setFilter(filter === difficulty ? null : difficulty);
      setLoadingDifficulty(null);
    }, 500);
  };

  return (
    <>
      <FilterInfo>You can filter recipes by difficulty.</FilterInfo>
      <FilterContainerDiv>
        <ButtonGroup>
          {["easy", "medium", "hard"].map((difficulty) => (
            <FilterButton
              key={difficulty}
              $active={(filter === difficulty).toString()}
              onClick={() => handleFilterClick(difficulty as Difficulty)}
              disabled={loadingDifficulty !== null}
            >
              {loadingDifficulty === difficulty && <Spinner />}
              {difficulty}
            </FilterButton>
          ))}
        </ButtonGroup>
      </FilterContainerDiv>
    </>
  );
}
