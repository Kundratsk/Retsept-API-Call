import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import "..//node_modules/bootstrap/dist/css/bootstrap.min.css";
import MealPlanner from "./pages/MealPlanner";

function App() {
  return (
    // 🔥 BrowserRouter = React Router töötab siin sees
    <BrowserRouter>

      {/* NAVBAR (menüü üleval) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-3">
        <div className="navbar-nav">

          {/* Link Home lehele */}
          <Link className="nav-link btn btn-outline-primary me-2" to="/">
            Home
          </Link>

          {/* Link Favorites lehele */}
          <Link className="nav-link btn btn-outline-secondary" to="/favorites">
            Favorites
          </Link>

          {/* Link Meal Planner lehele */}
          <Link className="nav-link btn btn-outline-success" to="/mealplanner">
            Meal Planner
          </Link>

        </div>
      </nav>

      {/* ROUTES = milline komponent millisel URL-il avaneb */}
      <Routes>

        {/* Avaleht */}
        <Route path="/" element={<Home />} />

        {/* Ühe retsepti detailvaade (nt /recipe/123) */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        {/* Lemmikud leht */}
        <Route path="/favorites" element={<Favorites />} />

        {/* Meal planner leht */}
        <Route path="/mealplanner" element={<MealPlanner />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;