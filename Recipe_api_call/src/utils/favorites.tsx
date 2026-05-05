
// 📦 Võtab kõik lemmikud localStoragest
export const getFavorites = () => {
  const data = localStorage.getItem("favorites");

  // kui andmed olemas → JSON → JS array
  // kui ei ole → tühi array
  return data ? JSON.parse(data) : [];
};


// ❤️ Lisab uue lemmiku
export const addFavorite = (recipe: any) => {
  // võta olemasolevad lemmikud
  const favorites = getFavorites();

  // kontrollime kas see retsept juba olemas
  const exists = favorites.some((f: any) => f.id === recipe.id);

  // kui juba olemas → ei lisa uuesti
  if (exists) return;

  // lisame uue retsepti olemasolevasse listi
  const updated = [...favorites, recipe];

  // salvestame tagasi localStorage-sse
  localStorage.setItem("favorites", JSON.stringify(updated));
};


// ❌ Eemaldab lemmiku ID järgi
export const removeFavorite = (id: string | number) => {
  // võta kõik lemmikud
  const favorites = getFavorites();

  // jätame alles kõik peale selle id-ga retsepti
  const updated = favorites.filter((f: any) => f.id !== id);

  // salvestame uuendatud listi
  localStorage.setItem("favorites", JSON.stringify(updated));
};


// 🔍 Kontrollib kas retsept on lemmik
export const isFavorite = (id: string | number) => {
  const favorites = getFavorites();

  // tagastab true või false
  return favorites.some((f: any) => f.id === id);
};