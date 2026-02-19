import { useState } from "react";

const Feedback = ({ setGood, setNeutral, setBad }) => {
  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood((prev) => prev + 1)}>good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const stats = (good, neutral, bad) => {
    const total = good + neutral + bad;
    return {
      getTotal: () => {
        return total;
      },
      getAverage: () => {
        return total === 0 ? 0 : (good - bad) / total;
      },
      getPositiveFeedback: () => {
        return total === 0 ? 0 : (good / total) * 100;
      },
    };
  };
  const appStat = stats(good, neutral, bad);
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {appStat.getTotal()}</p>
      <p>average {appStat.getAverage()}</p>
      <p>positive {appStat.getPositiveFeedback()}</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Feedback setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
