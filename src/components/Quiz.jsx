import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]); // API에서 받아올 데이터
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // ✅ API에서 퀴즈 데이터 불러오기
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz")
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((error) => console.error("API 데이터를 불러오는 중 오류 발생:", error));
  }, []);

  // ✅ 선택한 답변 처리
  const handleAnswerClick = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  // ✅ 다음 문제로 이동
  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      setQuizFinished(true);
    }
  };

  // ✅ 퀴즈 다시 시작
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelected(null);
    setScore(0);
    setQuizFinished(false);
  };

  // ✅ 로딩 중일 때 표시할 화면
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">퀴즈 데이터를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      {!quizFinished ? (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 text-center">
            {quizData[currentQuestion].question}
          </h2>
          <div className="mt-6 space-y-4">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full py-3 px-4 border rounded-lg text-lg font-medium transition text-center
                  ${
                    selected !== null
                      ? index === quizData[currentQuestion].answer
                        ? "bg-green-500 text-white"
                        : selected === index
                        ? "bg-red-500 text-white"
                        : "bg-white"
                      : "bg-white hover:bg-blue-200"
                  }`}
                onClick={() => handleAnswerClick(index)}
                disabled={selected !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {selected !== null && (
            <p
              className={`mt-4 text-lg font-semibold text-center ${
                selected === quizData[currentQuestion].answer ? "text-green-600" : "text-red-600"
              }`}
            >
              {selected === quizData[currentQuestion].answer ? "정답입니다! 🎉" : "오답입니다. ❌"}
            </p>
          )}

          {selected !== null && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                다음 문제
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-500">퀴즈 종료!</h2>
          <p className="text-lg mt-4">
            당신의 점수는 <span className="font-bold">{score}점</span> 입니다.
          </p>
          <button onClick={handleRestart} className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            다시 시작
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
