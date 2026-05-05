import { useState, useEffect } from "react";
import { searchRecipes } from "../services/api";
import { TextField, Button } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../types/recipe";

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("lastSearch");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }

    const savedQuery = localStorage.getItem("lastQuery");
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  // ✅ FIX: safe + macro-friendly + correct typing
  const addToMealPlan = (recipe: Recipe & { mealType?: MealType }) => {
    const existing = JSON.parse(localStorage.getItem("mealPlan") || "[]");

    const newItem = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,

      mealType: recipe.mealType || "lunch",
      portion: 1,

      // 🔥 SAFE MACROS (prevent undefined crash)
      calories: (recipe as any).calories || 0,
      protein: (recipe as any).protein || 0,
      fat: (recipe as any).fat || 0,
      carbs: (recipe as any).carbs || 0,
    };

    const updated = [...existing, newItem];

    localStorage.setItem("mealPlan", JSON.stringify(updated));

    // 🔥 trigger live update
    window.dispatchEvent(new Event("meal-update"));
  };

  const handleSearch = async () => {
    if (!query) return;

    try {
      setLoading(true);

      const data = await searchRecipes(query);


      setRecipes(data);

      localStorage.setItem("lastSearch", JSON.stringify(data));
      localStorage.setItem("lastQuery", query);
    } catch (err: any) {
      console.error("VIGA TEKKIS SIIN:", err);
      alert("Viga: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "40px 20px" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "80px" }}>
          🍽️ Recipe Search
        </h1>
        <p style={{ color: "#666" }}>
          Find delicious recipes instantly
        </p>
      </div>

      {/* SEARCH */}
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", gap: "10px" }}>

          <TextField
            fullWidth
            label="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>

        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading...
        </p>
      )}

      {/* RESULTS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
        marginTop: "40px",
        maxWidth: "1800px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        {recipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onAddToMealPlan={addToMealPlan}
          />
        ))}
      </div>

    </div>
  );
};

export default Home;