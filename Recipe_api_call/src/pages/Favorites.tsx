import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeFavorite } from "../utils/favorites";

const Favorites = () => {
  // Siin hoitakse lemmikute nimekirja (alguses tühi massiiv)
  const [favorites, setFavorites] = useState<any[]>([]);

  // Funktsioon, mis loeb lemmikud localStoragest
  const loadFavorites = () => {
    const data = localStorage.getItem("favorites");

    // Kui andmed olemas → muudame JSON → JS massiiviks
    // Kui pole → paneme tühja array
    setFavorites(data ? JSON.parse(data) : []);
  };

  // useEffect töötab ainult 1 kord, kui leht avaneb
  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div>
      {/* Pealkiri */}
      <h1>❤️ Favorites</h1>

      {/* Kui lemmikuid pole, näitame teksti */}
      {favorites.length === 0 && <p>Ei ole veel lemmikuid</p>}

      {/* Käime kõik lemmikud läbi ja kuvame neid */}
      {favorites.map((f) => (
        <div
          key={f.id} // iga element peab olema unikaalne
          style={{
            display: "flex", // paneb pildi, teksti ja nupu ühele reale
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
            gap: "10px",
          }}
        >
          {/* LINK retsepti lehele */}
          <Link
            to={`/recipe/${f.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none", // eemaldab lingi allajoone
              color: "inherit", // võtab teksti värvi vanemalt
            }}
          >
            {/* Retsepti pilt */}
            <img
              src={f.image}
              alt={f.title}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover", // pilt ei veni
                borderRadius: "8px",
              }}
            />

            {/* Retsepti nimi */}
            <h3 style={{ margin: 0 }}>{f.title}</h3>
          </Link>

          {/* Kustutamise nupp */}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              // eemaldame lemmiku localStorage-st
              removeFavorite(f.id);

              // laadime uuesti, et UI uuenduks
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