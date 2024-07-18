import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const response = await getAnswerFromBackend(input);

    setResultData(response["Answer"]);
    setLoading(false);

    setPrevPrompts([
      ...prevPrompts,
      { question: input, answer: response["Answer"] },
    ]);
    setInput("");

    const newSuggestedQuestions = response["Questions"];
    setSuggestedQuestions(newSuggestedQuestions);
    console.log(newSuggestedQuestions);  
    
  };

  const handleSuggestedQuestionClick = async (question) => {
    setInput(question);
    await onSent(question);
  };

  const getAnswerFromBackend = (question) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question }),
    };

    return fetch("http://localhost:5000/get_answer", fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setInput("");
      });
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    suggestedQuestions,
    setSuggestedQuestions,
    handleSuggestedQuestionClick,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
