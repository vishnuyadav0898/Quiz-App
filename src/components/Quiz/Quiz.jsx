import React, { useState, useEffect } from "react";

// Function to decode HTML entities
function decodeHTML(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent || doc.body.textContent;
}

let Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null); 
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [selected, setSelected] = useState(null); 
  const [data, setData] = useState([]); 

  const URL = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(URL);
        if (response.status===429) {
          setTimeout(fetchQuizData, 10000); 
          return;
        }
        const result = await response.json();
        const fetchedData = result.results.map((element) => {
          const options = [...element.incorrect_answers];
          const correctIndex = Math.floor(Math.random() * (options.length + 1));
          options.splice(correctIndex, 0, element.correct_answer);

          
          return {
            question: decodeHTML(element.question),
            option1: decodeHTML(options[0]),
            option2: decodeHTML(options[1]),
            option3: decodeHTML(options[2]),
            option4: decodeHTML(options[3]),
            ans: correctIndex + 1,
          };
        });
        setData(fetchedData); 
      } catch (error) {
        console.error('Error fetching or processing quiz data:', error);
      }
    };
      fetchQuizData(); 
  }, []); 

  useEffect(() => {
    if (data.length > 0) {
      setQuestion(data[index]);  
    }
  }, [data,index]);  

  const checkAns = (ans) => {
    if (!lock) {
      setSelected(ans);
      if (question.ans === ans) {
        setScore((prev) => prev + 1);
      }
      setLock(true);
    }
  };

  const Next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prev) => prev + 1);
      setLock(false);
      setSelected(null); 
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setSelected(null);
   
  };

  if (!question) {
    return <div className=" text-white flex justify-center items-center text-5xl my-60">Loading...</div>; 
  }

  return (
    <div className="w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[670px] mx-auto mt-12 sm:mt-20 md:mt-28 bg-white text-[#262626] flex flex-col gap-5 rounded-lg py-8 px-6 sm:px-10">
      <h1 className="text-xl sm:text-2xl font-semibold text-center"> Quiz </h1>
      <hr className="h-[2px] border-none bg-[#707070]" />
      {result ? (
        <>
          <h2 className="text-xl sm:text-2xl font-semibold text-center">
            Right Answers: {score} out of {data.length}.
          </h2>
          <button
            className="m-auto w-40 sm:w-60 h-12 sm:h-16 bg-[#553f9a] text-white text-lg sm:text-2xl font-medium cursor-pointer rounded-lg"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="m-auto w-40 sm:w-60 h-12 sm:h-16 bg-[#553f9a] text-white text-lg sm:text-2xl font-medium cursor-pointer rounded-lg"
            onClick={reset}
          >
            Start New
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl font-medium">
            {index + 1}. {question.question}
          </h2>
          <ul>
            {["option1", "option2", "option3", "option4"].map((opt, i) => (
              <li
                key={i}
                onClick={() => checkAns(i + 1)}
                className={`flex items-center h-16 sm:h-20 px-4 border-[1px] border-solid border-[#686868] rounded-lg mb-4 sm:mb-5 text-lg sm:text-2xl cursor-pointer
                    ${lock
                    ? question.ans === i + 1
                      ? "bg-green-200 border-green-600"
                      : selected === i + 1
                        ? "bg-red-200 border-red-700"
                        : ""
                    : ""
                    }`}
              >
                {question[opt]}
              </li>
            ))}
          </ul>
          <button
            className="m-auto w-40 sm:w-60 h-12 sm:h-16 bg-[#553f9a] text-white text-lg sm:text-2xl font-medium cursor-pointer rounded-lg"
            onClick={Next}
          >
            Next
          </button>
          <div className="m-auto text-lg sm:text-2xl">
            {score} of {data.length} question
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;



