import { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");
    if (data) setFavorites(JSON.parse(data));
  }, []);

  return (
    <div>
      <h1>Favorites</h1>

      {favorites.map((f) => (
        <div key={f.id}>{f.title}</div>
      ))}
    </div>
  );
};

export default Favorites;