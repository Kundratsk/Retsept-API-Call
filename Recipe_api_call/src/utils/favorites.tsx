export const getFavorites = () => {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};

export const addFavorite = (recipe: any) => {
  const favorites = getFavorites();

  const exists = favorites.some((f: any) => f.id === recipe.id);
  if (exists) return;

  const updated = [...favorites, recipe];
  localStorage.setItem("favorites", JSON.stringify(updated));
};

export const removeFavorite = (id: string | number) => {
  const favorites = getFavorites();
  const updated = favorites.filter((f: any) => f.id !== id);
  localStorage.setItem("favorites", JSON.stringify(updated));
};

export const isFavorite = (id: string | number) => {
  const favorites = getFavorites();
  return favorites.some((f: any) => f.id === id);
};