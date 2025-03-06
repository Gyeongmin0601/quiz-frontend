import React from "react";
import Quiz from "./components/Quiz.jsx"; // Quiz.js 불러오기

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mt-6">
        퀴즈 앱
      </h1>
      <div className="card p-6 bg-white shadow-lg rounded-lg mt-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <Quiz /> {/* 퀴즈 컴포넌트 추가 */}
      </div>
    </div>
  );
}

export default App;
