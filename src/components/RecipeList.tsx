import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  }
  return `${secs}s`;
}

export function RecipeList() {
  const recipes = useQuery(api.recipes.list);

  if (recipes === undefined) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">Loading recipes...</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No recipes yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="recipe-item">
          <h3 className="recipe-name">{recipe.name}</h3>
          <div className="recipe-details">
            <div className="recipe-detail">
              <span className="recipe-detail-label">Coffee:</span>
              <span>{recipe.coffeeAmount}g</span>
            </div>
            <div className="recipe-detail">
              <span className="recipe-detail-label">Water:</span>
              <span>{recipe.waterAmount}ml</span>
            </div>
            <div className="recipe-detail">
              <span className="recipe-detail-label">Ratio:</span>
              <span>1:{Math.round(recipe.waterAmount / recipe.coffeeAmount)}</span>
            </div>
          </div>
          <div className="recipe-details">
            <div className="recipe-detail">
              <span className="recipe-detail-label">Grind:</span>
              <span>{recipe.grindSize}</span>
            </div>
            <div className="recipe-detail">
              <span className="recipe-detail-label">Time:</span>
              <span>{formatTime(recipe.brewTime)}</span>
            </div>
            <div className="recipe-detail">
              <span className="recipe-detail-label">Temp:</span>
              <span>{recipe.temperature}°C</span>
            </div>
          </div>
          <div className="recipe-details" style={{ marginBottom: "0.5rem" }}>
            <div className="recipe-detail">
              <span className="recipe-detail-label">Method:</span>
              <span>{recipe.method}</span>
            </div>
          </div>
          <p className="recipe-description">{recipe.description}</p>
          {recipe.notes && (
            <p className="recipe-description" style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
              {recipe.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
