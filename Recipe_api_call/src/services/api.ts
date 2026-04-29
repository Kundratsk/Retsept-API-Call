import axios from "axios";

// Kuna import.meta.env võib vahel jamada, kontrolli, et sul on .env failis VITE_API_KEY olemas
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
});

/**
 * Kasutatakse Home lehel üldiseks otsinguks
 */
export const searchRecipes = async (query: string) => {
  const res = await api.get("/recipes/complexSearch", {
    params: {
      query,
      number: 12, // Mitu retsepti korraga kuvatakse
      addRecipeInformation: true, // Toob kaasa põhiinfo ja lühikesed juhised
      addRecipeNutrition: true,    // Toob kaasa makrod (kalorid, valgud jne)
      apiKey: API_KEY,
    },
  });
  return res.data.results || [];
};

/**
 * Kasutatakse RecipeDetail lehel konkreetse retsepti kuvamiseks ID järgi
 */
export const getRecipeById = async (id: number) => {
  const res = await api.get(`/recipes/${id}/information`, {
    params: {
      includeNutrition: true, // Kriitiline rida: toob makrod üksiku retsepti vaatesse
      apiKey: API_KEY,
    },
  });
  return res.data;
};