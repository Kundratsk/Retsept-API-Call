import { Card, CardContent, Typography, Button } from "@mui/material";
import type { Recipe } from "../types/recipe";
import { Link } from "react-router-dom";

interface Props {
  recipe: Recipe;
}


const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card sx={{ margin: 2 }}>
      <img 
  src={recipe.image} 
  alt={recipe.title} 
  style={{ 
    width: "20%",      // Pilt täidab kogu kaardi laiuse
    height: "auto",     // Kõik pildid on täpselt 200px kõrged
    objectFit: "cover",  // Pilti ei venita, vaid lõigatakse sobivaks
    display: "flex"     // Eemaldab tühja ruumi pildi alt
  }} 
/>
      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>

        <Button component={Link} to={`/recipe/${recipe.id}`}>
          Vaata detaili
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;