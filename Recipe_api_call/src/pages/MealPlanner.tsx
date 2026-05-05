import { useEffect, useState } from "react";

// Ühe retsepti andmete tüüp
type Recipe = {
  id: number;
  title: string;
  image?: string;

  calories: number;
  protein?: number;
  fat?: number;
  carbs?: number;

  // millise söögikorra alla see retsept kuulub
  mealType?: "breakfast" | "lunch" | "dinner" | "snack";
};

// Meal = Recipe + portsjoni info
type Meal = Recipe & {
  portion: number;
};

export default function MealPlanner() {
  // valik (kas täna, homme jne – praegu kasutusel ainult UI jaoks)
  const [date, setDate] = useState<"today" | "tomorrow" | "custom">("today");

  // eraldi state iga söögikorra jaoks
  const [breakfast, setBreakfast] = useState<Meal[]>([]);
  const [lunch, setLunch] = useState<Meal[]>([]);
  const [dinner, setDinner] = useState<Meal[]>([]);
  const [snacks, setSnacks] = useState<Meal[]>([]);

  // 📦 Laeb kõik toidud localStoragest ja jagab kategooriatesse
  const loadMeals = () => {
    const saved = localStorage.getItem("mealPlan");

    // kui pole midagi salvestatud, lõpetame
    if (!saved) return;

    // muudame JSON stringi JS objektiks
    const parsed = JSON.parse(saved);

    // jagame toidud mealType järgi eraldi listidesse
    setBreakfast(parsed.filter((r: any) => r.mealType === "breakfast"));
    setLunch(parsed.filter((r: any) => r.mealType === "lunch"));
    setDinner(parsed.filter((r: any) => r.mealType === "dinner"));
    setSnacks(parsed.filter((r: any) => r.mealType === "snack"));
  };

  // Käivitub 1 kord kui leht avaneb
  useEffect(() => {
    loadMeals();

    // kuulame sündmust "meal-update" (teistest komponentidest)
    const handler = () => loadMeals();
    window.addEventListener("meal-update", handler);

    // cleanup: eemaldame listeneri kui komponent sulgub
    return () => window.removeEventListener("meal-update", handler);
  }, []);

  // ❌ Funktsioon: eemaldab ühe toidu meal planist
  const removeMeal = (id: number) => {
    const saved = localStorage.getItem("mealPlan");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    // eemaldame selle id-ga toidu
    const updated = parsed.filter((r: any) => r.id !== id);

    // salvestame uuesti
    localStorage.setItem("mealPlan", JSON.stringify(updated));

    // uuendame UI
    loadMeals();
  };

  // 📊 Kõik toidud kokku (kasutatakse makrode arvutamiseks)
  const allMeals = [...breakfast, ...lunch, ...dinner, ...snacks];

  // 🔥 Kalorid kokku
  const calories = allMeals.reduce(
    (sum, item) => sum + item.calories * (item.portion || 1),
    0
  );

  // 🍗 Valk kokku
  const protein = allMeals.reduce(
    (sum, item) => sum + (item.protein || 0) * (item.portion || 1),
    0
  );

  // 🥑 Rasv kokku
  const fat = allMeals.reduce(
    (sum, item) => sum + (item.fat || 0) * (item.portion || 1),
    0
  );

  // 🍞 Süsivesikud kokku
  const carbs = allMeals.reduce(
    (sum, item) => sum + (item.carbs || 0) * (item.portion || 1),
    0
  );

  // 📈 progress bar jaoks (nt kui palju % päevanormist täis)
  const getProgress = (value: number, max: number) =>
    Math.min((value / max) * 100, 100);

  // 🧩 Üks funktsioon, mis joonistab ühe söögikorra UI
  const renderMeal = (title: string, meals: Meal[]) => (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">

        {/* söögikorra nimi */}
        <h5 className="mb-3">{title}</h5>

        {/* kui pole toite */}
        {meals.length === 0 ? (
          <p className="text-muted mb-0">No recipes added</p>
        ) : (
          meals.map((m) => (
            <div
              key={m.id}
              className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-2">

                {/* pilt (kui olemas) */}
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

                {/* nimi + portsjon */}
                <span>
                  🍽️ {m.title} (x{m.portion || 1})
                </span>
              </div>

              {/* kustutamise nupp */}
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

      {/* pealkiri */}
      <h2 className="text-center mb-4">📅 Meal Planner</h2>

      {/* iga söögikord eraldi */}
      {renderMeal("🍳 Hommikusöök", breakfast)}
      {renderMeal("🍗 Lõuna", lunch)}
      {renderMeal("🍝 Õhtu", dinner)}
      {renderMeal("🍎 Snäkid", snacks)}

    </div>
  );
}