import React, { useState, useEffect, useRef } from "react";

const Question = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
  answers,
}) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef();

  useEffect(() => {
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    console.log("Hi i changed");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    console.log("Selected is ", e.target.value);
    setSelected(e.target.value);
    if (error) {
      setError("");
    }
  };

  const nextClickHandler = (e) => {
    console.log("I am adding anser to array", e.target.value)
    if (selected === "") {
      return setError("Please select one option!");
    }
    console.log("Answer aray is", );
    onAnswerUpdate((prevState) => ([
      ...prevState,
      { q: data.questionId, a: selected },
    ]));
    setSelected("");
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      console.log("I am setting step 3");
      onSetStep(3);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{data.title}</h2>
          <div className="control" ref={radiosWrapper}>
            <label className="radio has-background-light">
              <input
                type="radio"
                name="answer"
                value={data.optionA}
                onChange={changeHandler}
              />
              {data.optionA}
            </label>
            <label className="radio has-background-light">
              <input
                type="radio"
                name="answer"
                value={data.optionB}
                onChange={changeHandler}
              />
              {data.optionB}
            </label>
            <label className="radio has-background-light">
              <input
                type="radio"
                name="answer"
                value={data.optionC}
                onChange={changeHandler}
              />
              {data.optionC}
            </label>
            <label className="radio has-background-light">
              <input
                type="radio"
                name="answer"
                value={data.optionD}
                onChange={changeHandler}
              />
              {data.optionD}
            </label>
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button
            className="button is-link is-medium is-fullwidth mt-4"
            onClick={nextClickHandler}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
