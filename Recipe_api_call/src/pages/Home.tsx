import { useState, useEffect } from "react"; // 1. Lisa useEffect import
import { searchRecipes } from "../services/api";
import { TextField, Button } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../types/recipe";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. See kood jookseb ÜKS KORD, kui kasutaja lehele tuleb
  useEffect(() => {
    const savedRecipes = localStorage.getItem("lastSearch");
    if (savedRecipes) {
      // Muudame teksti tagasi objektide massiiviks
      setRecipes(JSON.parse(savedRecipes));
    }
    
    // Võid taastada ka viimase otsingusõna
    const savedQuery = localStorage.getItem("lastQuery");
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  const handleSearch = async () => {
    if (!query) return; // Ära tee tühja päringut

    try {
      setLoading(true);
      const data = await searchRecipes(query);
      setRecipes(data);
      
      // 3. Salvestame tulemused LocalStorage'isse
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
    <div>
      <h1>Recipe Search</h1>

      <TextField
        label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // Et saaks ka Enter-klahviga otsida:
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />

      <Button onClick={handleSearch} variant="contained" sx={{ ml: 1 }}>
        Search
      </Button>

      {loading && <p>Loading...</p>}

      {/* 4. Ilusam vaade: paneme retseptid ritta (Grid) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px', 
        marginTop: '20px' 
      }}>
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
};

export default Home;