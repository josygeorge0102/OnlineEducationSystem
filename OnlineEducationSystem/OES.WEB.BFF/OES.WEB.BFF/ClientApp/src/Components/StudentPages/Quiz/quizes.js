import React from "react";
import "./Style.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { Table, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bulma/css/bulma.min.css";
import Start from "./Start";
import Question from "./Question";
import End from "./End";
import Modal from "./Modal";
// import quizData from "../../Data/Quiz.json";
import { useEffect, useState } from "react";
import useClaims from "../../Claims";
import axios from "axios";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

let interval;
const Quizes = () => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const { data: claims, isLoading } = useClaims();
  let location = useLocation();
  let { id } = useParams();
  const testId = id;

  let classroomId = location.pathname.split("/")[2];
  console.log("Classroom  Id from quiz comp is", classroomId);

  console.log("Test  Id from quiz comp is", id);
  console.log(location);

  let studentId = claims?.find((claim) => claim.type === "sub")?.value;

  const config = {
    headers: {
      "X-CSRF": "1",
    },
  };

  const url = `/api/classroomservice/questions/student/${studentId}/classrooms/${classroomId}/tests/${testId}/questions`;

  useEffect(() => {
    (async () => {
      axios
        .get(url, config)
        .then((res) => {
          console.log(res.data);
          setQuestions(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    })();
  }, [url]);

  console.log("question is here");
  console.log(questions);

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const resetClickHandler = () => {
    setActiveQuestion(0);
    // setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  return (
    <div className={`${"Quiz"} ${"Quiz .card"} ${"label.radio"} ${"root"}`}>
      {step === 1 && <Start onQuizStart={quizStartHandler} />}
      {step === 2 && (
        <Question
          data={questions[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={questions.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
          answers={answers}
        />
      )}
      {console.log("In end here answers", answers)}
      {step === 3 && (
        <End
          results={answers}
          data={questions}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
          time={time}
          answers={answers}
        />
      )}

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          results={answers}
          data={questions}
        />
      )}
    </div>
  );
};
export default Quizes;
