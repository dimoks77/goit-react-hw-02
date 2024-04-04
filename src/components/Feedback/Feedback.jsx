import css from "./Feedback.module.css";

const Feedback = ({ countGood, countNeutral, countBad }) => {
  const totalFeedback = countGood + countNeutral + countBad;
  const positive = Math.round((countGood / totalFeedback) * 100);
  return (
    <div className={css.counters}>
      <p>Good: {countGood}</p>
      <p>Neutral: {countNeutral}</p>
      <p>Bad: {countBad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positive} %</p>
    </div>
  );
};

export default Feedback;
