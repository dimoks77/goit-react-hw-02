import { useState, useEffect } from "react";
import css from "./App.module.css";
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";

export const App = () => {
  const [isFeedback, setIsFeedback] = useState(false);
  // вариан через объект
  // const [counts, setCounts] = useState({
  //   good: 0,
  //   neutral: 0,
  //   bad: 0
  // });

  const [counts, setCounts] = useState(() => {
    // Читаем данные из локального хранилища
    const storedCounts = localStorage.getItem("feedbackCounts");
    // Проверка они есть или нет
    if (storedCounts) {
      // парсим  из JSON
      return JSON.parse(storedCounts);
    } else {
      // Если нет, то возвращаем объект с нулями
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  useEffect(() => {
    // Тут при загрузке читаем то что в локал хранилище
    const storedCounts = localStorage.getItem("feedbackCounts");
    if (storedCounts) {
      setCounts(JSON.parse(storedCounts));
    }
  }, []);

  useEffect(() => {
    // При изменении сохраняем их в лок. хранилище
    localStorage.setItem("feedbackCounts", JSON.stringify(counts));
  }, [counts]);

  const updateFeedback = (type) => {
    setIsFeedback(true);
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  const handleClickReset = () => {
    setCounts({
      good: 0,
      neutral: 0,
      bad: 0,
    });
    setIsFeedback(false);
    localStorage.removeItem("feedbackCounts"); // удаляем из лок. хран.
  };

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} handleClickReset={handleClickReset} />
      {isFeedback ? <Feedback countGood={counts.good} countNeutral={counts.neutral} countBad={counts.bad} /> 
       : <p className={css.nofeedback}>No feedback yet</p>
      }
    </>
  );
};
