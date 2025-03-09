import React, { useState } from "react";

function Quiz() {
  const [question, setQuestion] = useState("HTML의 약자는 무엇인가?");
  const [options, setOptions] = useState([
    "HyperText Markup Language",
    "High Tech Modern Language",
    "Home Tool Management Language",
  ]);
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-bold text-blue-500 mt-6">{question}</h2>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full py-3 border rounded-lg text-gray-800 hover:bg-blue-200 transition ${
              selected === index ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => setSelected(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
