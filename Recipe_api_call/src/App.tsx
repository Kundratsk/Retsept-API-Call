import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import "..//node_modules/bootstrap/dist/css/bootstrap.min.css";
import MealPlanner from "./pages/MealPlanner";


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-3">
        <div className="navbar-nav">
          <Link className="nav-link btn btn-outline-primary me-2" to="/">
            Home
          </Link>

          <Link className="nav-link btn btn-outline-secondary" to="/favorites">
            Favorites
          </Link>

          <Link className="nav-link btn btn-outline-success" to="/mealplanner">
            Meal Planner
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/mealplanner" element={<MealPlanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;