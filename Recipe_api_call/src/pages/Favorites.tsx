import { useEffect, useState } from "react";
import { removeFavorite } from "../utils/favorites";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = () => {
    const data = localStorage.getItem("favorites");
    setFavorites(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadFavorites();

    // kui localStorage muutub teises tabis
    window.addEventListener("storage", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
    };
  }, []);

  return (
    <div>
      <h1>❤️ Favorites</h1>

      {favorites.length === 0 && <p>Ei ole veel lemmikuid</p>}

      {favorites.map((f) => (
        <div
          key={f.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <span>{f.title}</span>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              removeFavorite(f.id);
              loadFavorites();
            }}
          >
            🗑 Eemalda
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;