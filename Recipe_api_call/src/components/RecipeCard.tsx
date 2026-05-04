import { Card, CardContent, Typography, Button } from "@mui/material";
import type { Recipe } from "../types/recipe";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";

interface Props {
  recipe: Recipe;
  onAddToMealPlan?: (recipe: Recipe & { mealType: string }) => void;
}

const RecipeCard = ({ recipe, onAddToMealPlan }: Props) => {
  const [fav, setFav] = useState(false);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("lunch");

  useEffect(() => {
    setFav(isFavorite(recipe.id));
  }, [recipe.id]);

  const toggleFavorite = () => {
    if (fav) {
      removeFavorite(recipe.id);
      setFav(false);
    } else {
      addFavorite(recipe);
      setFav(true);
    }
  };

  return (
    <Card sx={{ margin: 2 }}>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: "20%",
          height: "auto",
          objectFit: "cover",
          display: "flex",
        }}
      />

      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>

        <Button component={Link} to={`/recipe/${recipe.id}`} variant="outlined" sx={{ ml: 2 }}>
          Vaata detaile
        </Button>

        <Button
          variant="outlined"
          color={fav ? "error" : "primary"}
          onClick={toggleFavorite}
          sx={{ ml: 2 }}
        >
          {fav ? " Eemalda lemmik" : " Lisa lemmikuks"}
        </Button>

        {/* 🔽 DROPDOWN (ÕIGE KOHT) */}
        {onAddToMealPlan && (
          <>
            

            <Button
              variant="contained"
              color="success"
              onClick={() =>
                onAddToMealPlan({
                  ...recipe,
                  mealType,
                })
              }
              sx={{ ml: 2 }}
              style={{padding: "2px", width: "155px", margin: "20px"}}
            >
              
              Lisa toidukorra planeerijasse
            </Button>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value as any)}
              style={{ marginLeft: 20, padding: "2px", borderRadius: "4px", borderColor: "#ccc" }}
            >
              <option value="breakfast">Hommikusöök</option>
              <option value="lunch">Lõuna</option>
              <option value="dinner">Õhtu</option>
              <option value="snack">Snäkid</option>
              
            </select>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;