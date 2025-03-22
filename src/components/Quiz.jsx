import { useState, useEffect } from "react";

function Quiz() {
  const [questions, setQuestions] = useState([]); // 백엔드에서 질문을 불러와 저장
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // 백엔드에서 퀴즈 데이터 가져오기
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        initializeScores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API 데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, []);

  // 등장인물 점수 초기화
  const initializeScores = (data) => {
    let characterScores = {};
    data.forEach((q) => {
      q.options.forEach((option) => {
        option.score.forEach((character) => {
          characterScores[character] = 0;
        });
      });
    });
    setScores(characterScores);
  };

  // 선택한 답변의 점수를 증가
  const handleAnswerClick = (score) => {
    const updatedScores = { ...scores };
    score.forEach((character) => {
      updatedScores[character]++;
    });
    setScores(updatedScores);

    // 마지막 질문이면 결과 표시
    if (currentQuestion === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // 결과 계산 (최고 점수 등장인물 찾기)
  const getResult = () => {
    let maxScore = -1;
    let selectedCharacter = "";

    Object.entries(scores).forEach(([character, score]) => {
      if (score > maxScore) {
        maxScore = score;
        selectedCharacter = character;
      }
    });

    return selectedCharacter;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {loading ? (
        <p className="text-xl">퀴즈 데이터를 불러오는 중...</p>
      ) : !isFinished ? (
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div className="flex flex-col gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleAnswerClick(option.score)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">결과 발표!</h2>
          <p className="text-lg">당신과 가장 유사한 등장인물은 <strong>{getResult()}</strong> 입니다.</p>
          <button
            className="mt-4 bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 transition"
            onClick={() => window.location.reload()}
          >
            다시 하기
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;