import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RecipeList } from "../components/RecipeList";
import { CreateRecipeModal } from "../components/CreateRecipeModal";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container">
      <header className="header">
        <h1>COFFEE RECIPES</h1>
      </header>
      <main className="main">
        <div className="section-header">
          <h2 className="section-title">All Recipes</h2>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            + New Recipe
          </button>
        </div>
        <RecipeList />
      </main>
      <CreateRecipeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
