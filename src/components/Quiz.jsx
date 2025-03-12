import React, { useState } from "react";

function Quiz() {
  const questions = [
    {
      question: "HTML의 약자는 무엇인가?",
      options: [
        "HyperText Markup Language",
        "High Tech Modern Language",
        "Home Tool Management Language",
      ],
      answer: 0, // 정답 인덱스
    },
    {
      question: "CSS의 역할은 무엇인가?",
      options: [
        "웹 페이지의 디자인을 담당",
        "웹 페이지의 기능을 담당",
        "웹 페이지의 데이터를 저장",
      ],
      answer: 0,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // 답변 선택 시 정답 여부 확인
  const handleAnswerClick = (index) => {
    setSelected(index);
    const correct = index === questions[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  // 다음 문제로 이동 또는 퀴즈 종료
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      setQuizFinished(true); // 퀴즈 종료
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      {!quizFinished ? (
        <>
          <h2 className="text-3xl font-bold text-blue-500 mt-6 text-center">
            {questions[currentQuestion].question}
          </h2>
          <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full py-3 px-4 border rounded-lg text-lg font-medium 
                  hover:bg-blue-200 transition text-center mt-2
                  ${
                    selected !== null
                      ? index === questions[currentQuestion].answer
                        ? "bg-green-500 text-white"
                        : selected === index
                        ? "bg-red-500 text-white"
                        : "bg-white"
                      : "bg-white"
                  }`}
                onClick={() => handleAnswerClick(index)}
                disabled={selected !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 정답 여부 메시지 표시 */}
          {selected !== null && (
            <p
              className={`mt-4 text-lg font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "정답입니다! 🎉" : "오답입니다. ❌"}
            </p>
          )}

          {/* 다음 문제 버튼 */}
          {selected !== null && (
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              다음 문제
            </button>
          )}
        </>
      ) : (
        // 퀴즈 종료 메시지 및 점수 표시
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-500 mt-6">퀴즈 종료!</h2>
          <p className="text-lg mt-4">
            당신의 점수는 <span className="font-bold">{score}</span>점입니다.
          </p>
          <button
            onClick={() => window.location.reload()} // 새로고침하여 퀴즈 다시 시작
            className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            다시 시작
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
