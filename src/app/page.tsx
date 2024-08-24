"use client";
import styled from "styled-components";
import FilterContainer from "./components/FilterContainer";
import RecipeList from "./components/RecipeList";
import { Recipe } from "./types/recipe";
import { Difficulty } from "./types/difficulty";
import { useState, useEffect } from "react";

// Styled components
const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 3rem;
  background-color: #f8f9fa;
  position: relative;
`;

const NavHeader = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
`;

const Logo = styled.img`
  height: 40px;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  text-align: center;
  font-weight: 600;
  margin-bottom: 5px;
`;

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<Difficulty | null>(null);

  useEffect(() => {
    // Make a GET request to the recipes API endpoint
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        const data = await response.json();
        setRecipes(data.recipes as Recipe[]);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <Nav>
        <Logo src="/logo.svg"></Logo>
        <NavHeader>Recipes</NavHeader>
      </Nav>
      <PageContainer>
        <Title>Trending Recipes</Title>
        <SubTitle>Difficulty</SubTitle>
        <FilterContainer filter={filter} setFilter={setFilter} />
        <RecipeList recipes={recipes} filter={filter} />
      </PageContainer>
    </>
  );
}
