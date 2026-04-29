import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeById(Number(id));
        setRecipe(data);
      } catch {
        alert("Error loading recipe");
      }
    };

    fetchData();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} style={{ width: "100%", maxWidth: "500px", borderRadius: "8px" }} />

      {/* --- MAKROD --- */}
      <div style={{ 
        marginTop: "20px", 
        padding: "15px", 
        backgroundColor: "#f9f9f9", 
        borderRadius: "8px",
        border: "1px solid #ddd" 
      }}>
        <h2>Nutritional Information (per serving)</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {recipe.nutrition?.nutrients.map((n: any) => {
            if (["Calories", "Fat", "Carbohydrates", "Protein"].includes(n.name)) {
              return (
                <li key={n.name}>
                  <strong>{n.name}:</strong> {Math.round(n.amount)} {n.unit}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>

      {/* --- KOOSTISOSAD --- */}
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ing: any) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      {/* --- VALMISTAMINE --- */}
      <h2>Instructions</h2>
      {recipe.instructions ? (
        <div 
          style={{ lineHeight: "1.6" }}
          dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
        />
      ) : (
        <p>No instructions available for this recipe.</p>
      )}
    </div>
  );
};

export default RecipeDetail;