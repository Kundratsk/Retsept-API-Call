import { Card, CardContent, Typography, Button } from "@mui/material";
import type { Recipe } from "../types/recipe";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  const [fav, setFav] = useState(false);

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

        <Button component={Link} to={`/recipe/${recipe.id}`}>
          Vaata detaili
        </Button>

        <Button
          variant="outlined"
          color={fav ? "error" : "primary"}
          onClick={toggleFavorite}
          sx={{ ml: 2 }}
        >
          {fav ? "💔 Eemalda" : "❤️ Lisa lemmikuks"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;