import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";

const RecipeDetail = () => {
  // URL-ist võetakse välja id (nt /recipe/123 → 123)
  const { id } = useParams();

  // Siin hoitakse ühe retsepti andmeid
  const [recipe, setRecipe] = useState<any>(null);

  // Käivitub kui leht laeb või id muutub
  useEffect(() => {
    const fetchData = async () => {
      try {
        // küsime API-st retsepti andmed id järgi
        const data = await getRecipeById(Number(id));

        // salvestame saadud andmed state'i
        setRecipe(data);
      } catch {
        // kui midagi läheb valesti
        alert("Error loading recipe");
      }
    };

    fetchData();
  }, [id]);

  // Kui andmed pole veel laetud, näitame loading teksti
  if (!recipe) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>

      {/* retsepti nimi */}
      <h1>{recipe.title}</h1>

      {/* portsjonite arv */}
      <p style={{ marginTop: "5px", fontSize: "18px" }}>
        <strong>Servings:</strong> {recipe.servings}
      </p>

      {/* retsepti pilt */}
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "8px",
        }}
      />

      {/* --- MAKROTOITAINED --- */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <h2>Nutritional Information (per serving)</h2>

        {/* käime läbi toitainete listi */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {recipe.nutrition?.nutrients.map((n: any) => {
            // näitame ainult neid toitaineid, mis on olulised
            if (
              ["Calories", "Fat", "Carbohydrates", "Protein"].includes(n.name)
            ) {
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
        {/* iga koostisosa eraldi listi rida */}
        {recipe.extendedIngredients.map((ing: any) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      {/* --- VALMISTAMISE JUHEND --- */}
      <h2>Instructions</h2>

      {/* kui juhend olemas */}
      {recipe.instructions ? (
        <div
          style={{ lineHeight: "1.6" }}

          // ⚠️ HTML otse lehele (kasulik API jaoks, aga peab olema ettevaatlik)
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />
      ) : (
        // kui juhend puudub
        <p>No instructions available for this recipe.</p>
      )}
    </div>
  );
};

export default RecipeDetail;