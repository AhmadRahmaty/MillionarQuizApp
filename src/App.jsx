import { useEffect, useState } from "react";
import { useMemo } from "react";
import Trivia from "./components/Trivia";
import "./App.css";
import { data } from "./DummyData";
import Timer from "./components/Timer";
import Start from './components/Start';

const App = () => {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("afg 0");

  const moneyTree = useMemo(
    () =>
      [
        { id: 1, amount: "afg 10" },
        { id: 2, amount: "afg 100" },
        { id: 3, amount: "afg 500" },
        { id: 4, amount: "afg 1,000" },
        { id: 5, amount: "afg 2,000" },
        { id: 6, amount: "afg 5,000" },
        { id: 7, amount: "afg 10,000" },
        { id: 8, amount: "afg 50,000" },
        { id: 9, amount: "afg 500,000" },
        { id: 10, amount: "afg 1,000,000" },
      ].reverse(),
    []
  );

  useEffect(() => {
        questionNumber > 1 && setEarned(moneyTree.find(m => m.id === questionNumber - 1).amount)
  }, [moneyTree,questionNumber])
  
  return (
    <div className="app">
      {username ? (
          <>
          <div className="main">
        {stop ? (
          <>
          <h1 className="conText">Congratulation👏👍</h1>
          <h1 className="endText">You earned:{earned}</h1>
          </>
        ) : (
          <>
            <div className="top">
              <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber}/></div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                setStop={setStop}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyTree.map((m) => (
            <li
              className={
                questionNumber === m.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
              key={m.id}
            >
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
          </>
      ) : <Start setUsername={setUsername}/>}
      
    </div>
  );
};

export default App;
