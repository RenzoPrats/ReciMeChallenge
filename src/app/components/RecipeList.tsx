"use client";
import styled from "styled-components";
import { Recipe } from "../types/recipe";
import { Difficulty } from "../types/difficulty";

// Styled components
const RecipeListDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const RecipeCard = styled.div<{ $highlighted: string }>`
  border: ${(props) =>
    props.$highlighted === "true" ? "3px solid #3586de" : "3px solid #505050"};
  border-radius: 15px;
  padding-bottom: 15px;
  background-color: ${(props) =>
    props.$highlighted === "true" ? "#e9ecef" : "white"};
`;

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
`;

const RecipeTitle = styled.h3<{ $highlighted: string }>`
  font-weight: 700;
  font-size: 1rem;
  margin-left: 10px;
  padding-top: 10px;
  color: ${(props) => (props.$highlighted === "true" ? "#3586de" : "black")};
`;

const DifficultyText = styled.p`
  color: #606060;
  margin-left: 10px;
  &::first-letter {
    text-transform: uppercase;
  }
`;

interface RecipeListProps {
  recipes: Recipe[];
  filter: Difficulty | null;
}

export default function RecipeList({ recipes, filter }: RecipeListProps) {
  // Sort and filter the recipes based on difficulty and position
  const filteredRecipes = recipes.sort((a, b) => {
    if (filter && a.difficulty === filter && b.difficulty !== filter) return -1;
    if (filter && a.difficulty !== filter && b.difficulty === filter) return 1;
    return a.position - b.position;
  });

  return (
    <RecipeListDiv>
      {filteredRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          $highlighted={(filter === recipe.difficulty).toString()}
        >
          <RecipeImage src={recipe.imageUrl} alt={recipe.name} />
          <RecipeTitle $highlighted={(filter === recipe.difficulty).toString()}>
            {recipe.name}
          </RecipeTitle>
          <DifficultyText>{recipe.difficulty}</DifficultyText>
        </RecipeCard>
      ))}
    </RecipeListDiv>
  );
}
