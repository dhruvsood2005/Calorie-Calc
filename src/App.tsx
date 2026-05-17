import { useState } from "react";
import "./index.css";

export default function App() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [results, setResults] = useState<null | {
    bmr: number;
    maintain: number;
    cut: number;
    bulk: number;
  }>(null);

  function calculateCalories(e: React.FormEvent) {
    e.preventDefault();

    const ageNum = Number(age);
    const heightNum = Number(height);
    const weightNum = Number(weight);
    const activityNum = Number(activity);

    if (!ageNum || !heightNum || !weightNum) {
      alert("Please fill in all fields.");
      return;
    }

    let bmr = 0;

    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const tdee = bmr * activityNum;

    setResults({
      bmr: Math.round(bmr),
      maintain: Math.round(tdee),
      cut: Math.round(tdee - 400),
      bulk: Math.round(tdee + 300),
    });
  }

  return (
    <div className="page">
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      <div className="app-shell">
        <div className="left-column">
          <p className="badge">Dhruv Sood</p>
          <h1>Calorie Calculator</h1>
          <p className="hero-text">
            Calculate your daily calories for cutting, maintaining, or bulking
            based on your body stats and activity level.
          </p>

          <div className="hero-points">
            <div className="hero-point">
              <span>🔥</span>
              <p>Personalised calorie estimate</p>
            </div>
            <div className="hero-point">
              <span>💪</span>
              <p>Perfect for cut, maintain, or bulk goals</p>
            </div>
            <div className="hero-point">
              <span>⚡</span>
              <p>Fast, clean, and beginner-friendly</p>
            </div>
          </div>
        </div>

        <div className="photo-panel">
          <img src="/dhruv-side.jpg" alt="Dhruv fitness" className="hero-image" />
          <div className="photo-overlay"></div>
        </div>

        <div className="app-card">
          <div className="header">
            <h2>Enter your details</h2>
            <p>Get your estimated BMR and daily calorie targets.</p>
          </div>

          <form className="form-grid" onSubmit={calculateCalories}>
            <div className="input-group">
              <label>Age</label>
              <input
                type="number"
                placeholder="e.g. 21"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="input-group">
              <label>Height (cm)</label>
              <input
                type="number"
                placeholder="e.g. 178"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                placeholder="e.g. 78"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="input-group full-width">
              <label>Activity Level</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                <option value="1.2">Sedentary - little or no exercise</option>
                <option value="1.375">Lightly Active - 1 to 3 days/week</option>
                <option value="1.55">Moderately Active - 3 to 5 days/week</option>
                <option value="1.725">Very Active - 6 to 7 days/week</option>
                <option value="1.9">Extra Active - athlete / intense activity</option>
              </select>
            </div>

            <button className="calculate-btn" type="submit">
              Calculate Calories
            </button>
          </form>

          {results && (
            <div className="results-section">
              <div className="results-top">
                <div className="result-box">
                  <p className="result-label">Estimated BMR</p>
                  <h3>{results.bmr}</h3>
                  <span>kcal/day</span>
                </div>

                <div className="result-box">
                  <p className="result-label">Maintenance</p>
                  <h3>{results.maintain}</h3>
                  <span>kcal/day</span>
                </div>
              </div>

              <div className="goal-cards">
                <div className="goal-card cut">
                  <p>Cut</p>
                  <h4>{results.cut} kcal</h4>
                  <span>Recommended deficit</span>
                </div>

                <div className="goal-card maintain">
                  <p>Maintain</p>
                  <h4>{results.maintain} kcal</h4>
                  <span>Stay around this level</span>
                </div>

                <div className="goal-card bulk">
                  <p>Bulk</p>
                  <h4>{results.bulk} kcal</h4>
                  <span>Recommended surplus</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}