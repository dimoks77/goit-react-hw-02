import { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

export const App = () => {
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
    setCounts(prevCounts => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1
    }));
  };

  const handleClickReset = () => {
    setCounts({
      good: 0,
      neutral: 0,
      bad: 0
    });
    localStorage.removeItem("feedbackCounts"); // удаляем из лок. хран.
  };

  const totalFeedback = counts.good + counts.neutral + counts.bad;
  const positive = Math.round((counts.good / totalFeedback) * 100);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} handleClickReset={handleClickReset} totalFeedback={totalFeedback} />
      { totalFeedback > 0 ? <Feedback counts={counts} totalFeedback={totalFeedback} positive={positive} /> : <Notification /> }
    </>
  );
};
