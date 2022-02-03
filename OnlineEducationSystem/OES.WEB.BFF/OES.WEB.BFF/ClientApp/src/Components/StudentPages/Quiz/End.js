import React, { useEffect, useState } from "react";

import { formatTime } from "../../../utils";

const End = ({ results, data, onReset, onAnswersCheck, time, answers }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  let correct = 0;
  // const updateResult = () => {};
  // updateResult();
  useEffect(() => {
    console.log("I am users answers");
    console.log(answers);
    console.log("I am orognal ansers");
    console.log(data);
    results.forEach((ans, index) => {
      if (ans.a.toUpperCase() === data[index].correctAnswer.toUpperCase()) {
        console.log("new correct answer");
        correct++;
      }
    });
    setCorrectAnswers(correct);
    //eslint - disable - next - line;
  }, []);
  console.log("I am in end", correctAnswers);
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>
            {correctAnswers} of {data.length}
          </p>
          <p>
            <strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong>
          </p>
          <p>
            <strong>Your time:</strong> {formatTime(time)}
          </p>
          <button className="button is-info mr-2" onClick={onAnswersCheck}>
            Check your answers
          </button>
          <button className="button is-success" onClick={onReset}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default End;
