import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeFavorite } from "../utils/favorites";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = () => {
    const data = localStorage.getItem("favorites");
    setFavorites(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadFavorites();
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
      alignItems: "center",
      marginBottom: "15px",
      gap: "10px",
    }}
  >
    {/* IMAGE + TITLE LINK */}
    <Link
      to={`/recipe/${f.id}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <img
        src={f.image}
        alt={f.title}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3 style={{ margin: 0 }}>{f.title}</h3>
    </Link>

    {/* DELETE BUTTON */}
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