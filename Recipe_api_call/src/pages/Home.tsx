import { useState, useEffect } from "react";
import { searchRecipes } from "../services/api";
import { TextField, Button } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../types/recipe";

// Toidu tüübid (kasutatakse meal plani jaoks)
type MealType = "breakfast" | "lunch" | "dinner" | "snack";

const Home = () => {
  // Kasutaja otsingusõna (input fieldi väärtus)
  const [query, setQuery] = useState("");

  // Leitud retseptid API-st
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Näitab kas laadimine käib
  const [loading, setLoading] = useState(false);

  // Kui leht laeb esimest korda
  useEffect(() => {
    // Võtame eelmine otsing localStoragest (kui olemas)
    const savedRecipes = localStorage.getItem("lastSearch");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }

    // Võtame eelmine otsingusõna localStoragest
    const savedQuery = localStorage.getItem("lastQuery");
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  // Funktsioon: lisab retsepti päevaplaani (meal plani)
  const addToMealPlan = (recipe: Recipe & { mealType?: MealType }) => {
    // Võtame olemasoleva meal plani localStoragest
    const existing = JSON.parse(localStorage.getItem("mealPlan") || "[]");

    // Loome uue objekti, mida salvestame
    const newItem = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,

      // Kui mealType puudub, siis default on "lunch"
      mealType: recipe.mealType || "lunch",

      // Vaikimisi portsjon
      portion: 1,

      // Makrod (kui puuduvad, siis 0 → et ei läheks katki)
      calories: (recipe as any).calories || 0,
      protein: (recipe as any).protein || 0,
      fat: (recipe as any).fat || 0,
      carbs: (recipe as any).carbs || 0,
    };

    // Lisame uue toidu olemasolevasse nimekirja
    const updated = [...existing, newItem];

    // Salvestame tagasi localStorage-sse
    localStorage.setItem("mealPlan", JSON.stringify(updated));

    // Teavitame teisi komponente, et meal plan muutus
    window.dispatchEvent(new Event("meal-update"));
  };

  // Funktsioon: otsib retsepte API-st
  const handleSearch = async () => {
    // Kui input on tühi, siis ei tee midagi
    if (!query) return;

    try {
      // Näitame "loading..." teksti
      setLoading(true);

      // Kutsume API ja saame retseptid
      const data = await searchRecipes(query);

      // Paneme tulemused state'i
      setRecipes(data);

      // Salvestame otsingu ja tulemused localStoragessse
      localStorage.setItem("lastSearch", JSON.stringify(data));
      localStorage.setItem("lastQuery", query);

    } catch (err: any) {
      // Kui midagi läheb valesti, näitame veateadet
      console.error("VIGA:", err);
      alert("Viga: " + err.message);
    } finally {
      // Lõpuks lõpetame loadingu
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "40px 20px" }}>

      {/* Pealkiri */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "80px" }}>
          🍽️ Recipe Search
        </h1>
        <p style={{ color: "#666" }}>
          Leia maitsvaid retsepte kiiresti
        </p>
      </div>

      {/* OTSINGU ALA */}
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", gap: "10px" }}>

          {/* Tekstikast otsinguks */}
          <TextField
            fullWidth
            label="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // uuendab inputi
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter käivitab otsingu
          />

          {/* Otsingu nupp */}
          <Button
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>

        </div>
      </div>

      {/* Kui laadimine käib */}
      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading...
        </p>
      )}

      {/* RETSEPTIDE TULEMUSED */}
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
            key={r.id} // iga kaart peab olema unikaalne
            recipe={r}
            onAddToMealPlan={addToMealPlan} // saadame funktsiooni alla
          />
        ))}
      </div>

    </div>
  );
};

export default Home;