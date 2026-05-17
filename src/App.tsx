import { useState } from "react";
import "./index.css";

type MacroPlan = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type Results = {
  bmr: number;
  cut: MacroPlan;
  maintain: MacroPlan;
  bulk: MacroPlan;
};

export default function App() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [goalSpeed, setGoalSpeed] = useState("moderate");
  const [results, setResults] = useState<Results | null>(null);

  const [currentBodyFat, setCurrentBodyFat] = useState("");
  const [goalBodyFat, setGoalBodyFat] = useState("");
  const [showBodyFat, setShowBodyFat] = useState(false);

const [showTimeline, setShowTimeline] = useState(false);
const [goalWeight, setGoalWeight] = useState("");
const [timelineSpeed, setTimelineSpeed] = useState("0.5");

const [timelineCalculated, setTimelineCalculated] = useState(false);

  const bodyFatOptions = [
  {
    label: "10-12%",
    male: "/male-10-12.jpg",
    female: "/female-10-12.jpg",
    desc: "Very lean. Visible abs and high definition."
  },
  {
    label: "13-15%",
    male: "/male-13-15.jpg",
    female: "/female-13-15.jpg",
    desc: "Lean and athletic."
  },
  {
    label: "16-18%",
    male: "/male-16-18.jpg",
    female: "/female-16-18.jpg",
    desc: "Fit with moderate definition."
  },
  {
    label: "19-22%",
    male: "/male-19-22.jpg",
    female: "/female-19-22.jpg",
    desc: "Average fitness."
  },
  {
    label: "23-27%",
    male: "/male-23-27.jpg",
    female: "/female-23-27.jpg",
    desc: "Softer physique."
  },
  {
    label: "28%+",
    male: "/male-28-plus.jpg",
    female: "/female-28-plus.jpg",
    desc: "Higher body fat."
  }
];

const currentWeightNum = Number(weight);
const goalWeightNum = Number(goalWeight);
const timelineSpeedNum = Number(timelineSpeed);

const weightDifference =
  Math.abs(goalWeightNum - currentWeightNum);

const weeksNeeded =
  Math.ceil(weightDifference / timelineSpeedNum);

const isLosing =
  goalWeightNum < currentWeightNum;

  function calculateMacros(calories: number, weightNum: number): MacroPlan {
    const protein = Math.round(weightNum * 2.2);
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

    return {
      calories,
      protein,
      carbs,
      fat,
    };
  }

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

    const tdee = Math.round(bmr * activityNum);

    let cutAdjustment = 400;
    let bulkAdjustment = 300;

    if (goalSpeed === "slow") {
      cutAdjustment = 250;
      bulkAdjustment = 150;
    } else if (goalSpeed === "aggressive") {
      cutAdjustment = 650;
      bulkAdjustment = 500;
    }

    setResults({
      bmr: Math.round(bmr),
      cut: calculateMacros(tdee - cutAdjustment, weightNum),
      maintain: calculateMacros(tdee, weightNum),
      bulk: calculateMacros(tdee + bulkAdjustment, weightNum),
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
            Calculate your daily calories and macros for cutting, maintaining,
            or bulking based on your body stats and activity level.
          </p>

          <div className="hero-points">
            <div className="hero-point">
              <span>🔥</span>
              <p>Personalised calorie estimate</p>
            </div>

            <div className="hero-point">
              <span>💪</span>
              <p>Cut, maintain, and bulk macro targets</p>
            </div>

            <div className="hero-point">
              <span>⚡</span>
              <p>Fast, clean, and beginner-friendly</p>
            </div>
          </div>
        </div>

        <div className="photo-panel">
          <img
            src="/dhruv-side.jpg"
            alt="Dhruv fitness"
            className="hero-image"
          />
          <div className="photo-overlay"></div>
        </div>

        <div className="app-card">
          <div className="header">
            <h2>Enter your details</h2>
            <p>Get your estimated BMR, calories, and macros.</p>
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

            <div className="input-group full-width">
              <label>Goal Speed</label>
              <select
                value={goalSpeed}
                onChange={(e) => setGoalSpeed(e.target.value)}
              >
                <option value="slow">Slow - easier to stick to</option>
                <option value="moderate">Moderate - balanced approach</option>
                <option value="aggressive">Aggressive - faster but harder</option>
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
                  <h3>{results.maintain.calories}</h3>
                  <span>kcal/day</span>
                </div>
              </div>

              <div className="macro-plan cut">
                <div>
                  <p>Cut</p>
                  <h4>{results.cut.calories} kcal</h4>
                </div>

                <div className="macro-row">
                  <span>Protein: {results.cut.protein}g</span>
                  <span>Carbs: {results.cut.carbs}g</span>
                  <span>Fat: {results.cut.fat}g</span>
                </div>
              </div>

              <div className="macro-plan maintain">
                <div>
                  <p>Maintain</p>
                  <h4>{results.maintain.calories} kcal</h4>
                </div>

                <div className="macro-row">
                  <span>Protein: {results.maintain.protein}g</span>
                  <span>Carbs: {results.maintain.carbs}g</span>
                  <span>Fat: {results.maintain.fat}g</span>
                </div>
              </div>

              <div className="macro-plan bulk">
                <div>
                  <p>Bulk</p>
                  <h4>{results.bulk.calories} kcal</h4>
                </div>

                <div className="macro-row">
                  <span>Protein: {results.bulk.protein}g</span>
                  <span>Carbs: {results.bulk.carbs}g</span>
                  <span>Fat: {results.bulk.fat}g</span>
                </div>
              </div>
            </div>
          )}
<button
  type="button"
  className="timeline-toggle-btn"
  onClick={() => setShowTimeline(!showTimeline)}
>
  {showTimeline ? "Hide Weight Loss Timeline" : "Show Weight Loss Timeline"}
</button>

{showTimeline && (
  <div className="timeline-section">
    <div className="timeline-header">
      <h2>Weight Loss Goal Timeline</h2>
      <p>Enter your goal weight and choose your weekly weight loss speed.</p>
    </div>

    <div className="input-group full-width">
      <label>Goal Weight (kg)</label>
      <input
        type="number"
        placeholder="e.g. 70"
        value={goalWeight}
        onChange={(e) => setGoalWeight(e.target.value)}
      />
    </div>

    <div className="input-group full-width">
      <label>Weight Change Speed</label>
      <select
        value={timelineSpeed}
        onChange={(e) => setTimelineSpeed(e.target.value)}
      >
        <option value="0.25">Slow - 0.25 kg/week</option>
        <option value="0.5">Moderate - 0.5 kg/week</option>
        <option value="0.75">Aggressive - 0.75 kg/week</option>
      </select>
    </div>

    <button
  type="button"
  className="calculate-timeline-btn"
  onClick={() => setTimelineCalculated(true)}
>
  Calculate Timeline
</button>

{timelineCalculated &&
weight &&
goalWeight && (

<div className="timeline-result">

<h3>
{weeksNeeded} weeks
</h3>

<p>

You need to
<strong>
 {isLosing ? " lose " : " gain "}
</strong>

<strong>
{weightDifference.toFixed(1)}kg
</strong>

to go from

<strong>
 {weight}kg
</strong>

to

<strong>
 {goalWeight}kg
</strong>

</p>

</div>

)}
  </div>
)}

<button
  type="button"
  className="bodyfat-toggle-btn"
  onClick={() => setShowBodyFat(!showBodyFat)}
>
  {showBodyFat
    ? "Hide Body Fat Visual Estimator"
    : "Show Body Fat Visual Estimator"}
</button>

{showBodyFat && (
  <div className="bodyfat-section">
    <div className="bodyfat-header">
      <h2>Body Fat Visual Estimator</h2>

      <p>
        Pick the image range closest to you now and where
        you want to be.
      </p>
    </div>

    <div className="bodyfat-grid">
      {bodyFatOptions.map((option) => (
        <button
          key={option.label}
          type="button"
          className={`bodyfat-card ${
            currentBodyFat === option.label
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setCurrentBodyFat(option.label)
          }
        >
          <div className="comparison-images">

            <div>
              <img
                src={option.male}
                alt="male physique"
                className="bodyfat-img"
              />

              <span className="img-label">
                Male
              </span>
            </div>

            <div>
              <img
                src={option.female}
                alt="female physique"
                className="bodyfat-img"
              />

              <span className="img-label">
                Female
              </span>
            </div>

          </div>

          <h3>{option.label}</h3>

          <p>{option.desc}</p>
        </button>
      ))}
    </div>

    <div className="input-group full-width">
      <label>Goal Body Fat</label>

      <select
        value={goalBodyFat}
        onChange={(e) =>
          setGoalBodyFat(
            e.target.value
          )
        }
      >
        <option value="">
          Select your goal
        </option>

        {bodyFatOptions.map(
          (option) => (
            <option
              key={option.label}
              value={option.label}
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>

    {currentBodyFat &&
      goalBodyFat && (
        <div className="bodyfat-result">
          <h3>
            Your visual goal
          </h3>

          <p>
            You are currently around{" "}
            <strong>
              {currentBodyFat}
            </strong>{" "}
            and your goal is{" "}
            <strong>
              {goalBodyFat}
            </strong>
          </p>

          <p>
            Track progress with
            photos, weight,
            measurements and your
            calorie targets.
          </p>
        </div>
      )}
  </div>
)}
        </div>
      </div>
    </div>
  );
}