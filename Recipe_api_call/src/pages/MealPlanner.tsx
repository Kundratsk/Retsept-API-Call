import { useEffect, useState } from "react";


type Recipe = {
  id: number;
  title: string;
  image?: string;

  calories: number;
  protein?: number;
  fat?: number;
  carbs?: number;

  mealType?: "breakfast" | "lunch" | "dinner" | "snack";
};

type Meal = Recipe & {
  portion: number;
};

export default function MealPlanner() {
  const [date, setDate] = useState<"today" | "tomorrow" | "custom">("today");

  const [breakfast, setBreakfast] = useState<Meal[]>([]);
  const [lunch, setLunch] = useState<Meal[]>([]);
  const [dinner, setDinner] = useState<Meal[]>([]);
  const [snacks, setSnacks] = useState<Meal[]>([]);

  // 📦 LOAD + REFRESH
  const loadMeals = () => {
    const saved = localStorage.getItem("mealPlan");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    setBreakfast(parsed.filter((r: any) => r.mealType === "breakfast"));
    setLunch(parsed.filter((r: any) => r.mealType === "lunch"));
    setDinner(parsed.filter((r: any) => r.mealType === "dinner"));
    setSnacks(parsed.filter((r: any) => r.mealType === "snack"));
  };

  useEffect(() => {
    loadMeals();

    const handler = () => loadMeals();
    window.addEventListener("meal-update", handler);

    return () => window.removeEventListener("meal-update", handler);
  }, []);

  // ❌ remove meal
  const removeMeal = (id: number) => {
    const saved = localStorage.getItem("mealPlan");
    if (!saved) return;

    const parsed = JSON.parse(saved);
    const updated = parsed.filter((r: any) => r.id !== id);

    localStorage.setItem("mealPlan", JSON.stringify(updated));
    loadMeals();
  };

  // 📊 CALCULATION (REAL TIME)
  const allMeals = [...breakfast, ...lunch, ...dinner, ...snacks];

  const calories = allMeals.reduce(
    (sum, item) => sum + item.calories * (item.portion || 1),
    0
  );

  const protein = allMeals.reduce(
    (sum, item) => sum + (item.protein || 0) * (item.portion || 1),
    0
  );

  const fat = allMeals.reduce(
    (sum, item) => sum + (item.fat || 0) * (item.portion || 1),
    0
  );

  

  const carbs = allMeals.reduce(
    (sum, item) => sum + (item.carbs || 0) * (item.portion || 1),
    0
  );

  const getProgress = (value: number, max: number) =>
    Math.min((value / max) * 100, 100);

  const renderMeal = (title: string, meals: Meal[]) => (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">{title}</h5>

        {meals.length === 0 ? (
          <p className="text-muted mb-0">No recipes added</p>
        ) : (
          meals.map((m) => (
            <div
              key={m.id}
              className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-2">
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

                <span>
                  🍽️ {m.title} (x{m.portion || 1})
                </span>
              </div>

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

  return (
    <div className="container py-4">

      <h2 className="text-center mb-4">📅 Meal Planner</h2>

      {/* MEALS */}
      {renderMeal("🍳 Hommikusöök", breakfast)}
      {renderMeal("🍗 Lõuna", lunch)}
      {renderMeal("🍝 Õhtu", dinner)}
      {renderMeal("🍎 Snäkid", snacks)}

      {/* SUMMARY */}
      <div className="card mt-4 shadow">
        <div className="card-body">
          <h5 className="mb-3">📊 Kokkuvõte</h5>

          <p>🔥 Calories: {Math.round(calories)} / 3000 kcal</p>
          <div className="progress mb-3">
            <div
              className="progress-bar bg-danger"
              style={{ width: `${getProgress(calories, 3000)}%` }}
            />
          </div>

          <p>💪 Protein: {Math.round(protein)}g / 200g</p>
          <div className="progress mb-3">
            <div
              className="progress-bar bg-success"
              style={{ width: `${getProgress(protein, 200)}%` }}
            />
          </div>

          <p>🥑 Fat: {Math.round(fat)}g / 90g</p>
          <div className="progress mb-3">
            <div
              className="progress-bar bg-warning"
              style={{ width: `${getProgress(fat, 90)}%` }}
            />
          </div>

          <p>🍞 Carbs: {Math.round(carbs)}g / 320g</p>
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
  console.log("API DATA:", data);
}