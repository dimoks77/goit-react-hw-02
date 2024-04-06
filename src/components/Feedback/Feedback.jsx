import css from "./Feedback.module.css";

const Feedback = ({ counts, positive, totalFeedback }) => {

  return (
    <div className={css.counters}>
      <p>Good: {counts.good}</p>
      <p>Neutral: {counts.neutral}</p>
      <p>Bad: {counts.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positive} %</p>
    </div>
  );
};

export default Feedback;
