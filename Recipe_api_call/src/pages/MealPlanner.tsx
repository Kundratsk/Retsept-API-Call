import { useEffect, useState } from "react";

type Recipe = {
  id: number;
  title: string;
  image?: string;
};

type Meal = Recipe;

export default function MealPlanner() {
  const [date, setDate] = useState<"today" | "tomorrow" | "custom">("today");

    const [breakfast, setBreakfast] = useState<Meal[]>([]);
    const [lunch, setLunch] = useState<Meal[]>([]);
    const [dinner, setDinner] = useState<Meal[]>([]);
    const [snacks, setSnacks] = useState<Meal[]>([]);

  // demo macros
  const calories = 1850;
  const protein = 120;
  const fat = 70;
  const carbs = 200;

  // 📦 LOAD DATA FROM HOME
  useEffect(() => {
  const saved = localStorage.getItem("mealPlan");

  if (saved) {
    const parsed = JSON.parse(saved);

    setBreakfast(parsed.filter((r: any) => r.mealType === "breakfast"));
    setLunch(parsed.filter((r: any) => r.mealType === "lunch"));
    setDinner(parsed.filter((r: any) => r.mealType === "dinner"));
    setSnacks(parsed.filter((r: any) => r.mealType === "snack"));
  }
}, []);

  const getProgress = (value: number, max: number) =>
    Math.min((value / max) * 100, 100);

  const removeMeal = (id: number) => {
  const saved = localStorage.getItem("mealPlan");

  if (!saved) return;

  const parsed = JSON.parse(saved);

  const updated = parsed.filter((r: any) => r.id !== id);

  localStorage.setItem("mealPlan", JSON.stringify(updated));

  // update UI ka
  setBreakfast(updated.filter((r: any) => r.mealType === "breakfast"));
  setLunch(updated.filter((r: any) => r.mealType === "lunch"));
  setDinner(updated.filter((r: any) => r.mealType === "dinner"));
  setSnacks(updated.filter((r: any) => r.mealType === "snack"));
};

  const renderMeal = (title: string, meals: Meal[]) => {
    return (
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">{title}</h5>

          {meals.length === 0 ? (
            <p className="text-muted mb-0">No recipes added</p>
          ) : (
            meals.map((m) => (
              <div key={m.id} className="border rounded p-2 mb-2 d-flex gap-2 align-items-center">
                {m.image && (
                  <img
                    src={m.image}
                    alt={m.title}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                )}
                🍽️ {m.title}

                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeMeal(m.id)}
                >
                    Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <h2 className="text-center mb-4">📅 Meal Planner</h2>

      {/* DATE SELECTOR */}
      <div className="card mb-4">
        <div className="card-body d-flex gap-2 justify-content-center">
          <button
            className={`btn btn-${date === "today" ? "primary" : "outline-primary"}`}
            onClick={() => setDate("today")}
          >
            Täna
          </button>

          

        
        </div>
      </div>

      {/* MEAL SLOTS */}
      {renderMeal("🍳 Hommikusöök", breakfast)}
      {renderMeal("🍗 Lõuna", lunch)}
      {renderMeal("🍝 Õhtu", dinner)}
      {renderMeal("🍎 Snäkid", snacks)}

      {/* SUMMARY */}
      <div className="card mt-4 shadow">
        <div className="card-body">
          <h5 className="mb-3">📊 Kokkuvõte</h5>

          <p>🔥 Calories: {calories} / 3000 kcal</p>
          <div className="progress mb-3">
            <div
              className="progress-bar bg-danger"
              style={{ width: `${getProgress(calories, 3000)}%` }}
            />
          </div>

          <p>💪 Protein: {protein}g / 200g</p>
          <div className="progress mb-3">
            <div
              className="progress-bar bg-success"
              style={{ width: `${getProgress(protein, 200)}%` }}
            />
          </div>

          <p>🥑 Fat: {fat}g / 90g</p>
          <div className="progress mb-3">
            <div
              className="progress-bar bg-warning"
              style={{ width: `${getProgress(fat, 90)}%` }}
            />
          </div>

          <p>🍞 Carbs: {carbs}g / 320g</p>
          <div className="progress">
            <div
              className="progress-bar bg-info"
              style={{ width: `${getProgress(carbs, 320)}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}