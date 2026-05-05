import { Card, CardContent, Typography, Button } from "@mui/material";
import type { Recipe } from "../types/recipe";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";

// Props ehk andmed, mida komponent saab väljast (parent komponendilt)
interface Props {
  recipe: Recipe;

  // funktsioon, mis lisab retsepti meal plannerisse (valikuline)
  onAddToMealPlan?: (recipe: Recipe & { mealType: string }) => void;
}

const RecipeCard = ({ recipe, onAddToMealPlan }: Props) => {
  // kas see retsept on lemmik (true/false)
  const [fav, setFav] = useState(false);

  // valitud söögikord (default = lõuna)
  const [mealType, setMealType] =
    useState<"breakfast" | "lunch" | "dinner" | "snack">("lunch");

  // kui komponent laeb, kontrollime kas see retsept on lemmik
  useEffect(() => {
    setFav(isFavorite(recipe.id));
  }, [recipe.id]);

  // funktsioon: lisab või eemaldab lemmikute seast
  const toggleFavorite = () => {
    if (fav) {
      // kui juba lemmik → eemaldame
      removeFavorite(recipe.id);
      setFav(false);
    } else {
      // kui pole lemmik → lisame
      addFavorite(recipe);
      setFav(true);
    }
  };

  return (
    <Card sx={{ margin: 2 }}>

      {/* retsepti pilt */}
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

        {/* retsepti nimi */}
        <Typography variant="h6">{recipe.title}</Typography>

        {/* nupp: viib detailvaatesse */}
        <Button
          component={Link}
          to={`/recipe/${recipe.id}`}
          variant="outlined"
          sx={{ ml: 2, width: "155px", marginBottom: "5px" }}
        >
          Vaata detaile
        </Button>

        {/* nupp: lisa või eemalda lemmikutest */}
        <Button
          variant="outlined"
          color={fav ? "error" : "primary"}
          onClick={toggleFavorite}
          sx={{ ml: 2 }}
        >
          {fav ? "Eemalda lemmik" : "Lisa lemmikuks"}
        </Button>

        {/* 🔽 Meal planner osa (näitab ainult siis kui funktsioon on olemas) */}
        {onAddToMealPlan && (
          <>
            {/* nupp: lisab retsepti meal plannerisse */}
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                onAddToMealPlan({
                  ...recipe,
                  mealType, // lisame valitud söögikorra
                })
              }
              sx={{ ml: 2 }}
              style={{ padding: "2px", width: "155px", margin: "5px" }}
            >
              Lisa toidukorra planeerijasse
            </Button>

            {/* dropdown: vali millisesse söögikorda läheb */}
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value as any)}
              style={{
                marginLeft: 20,
                padding: "2px",
                borderRadius: "4px",
                borderColor: "#ccc",
              }}
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