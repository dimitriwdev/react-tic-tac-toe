import { useState } from "react";
import Board from "./components/Board";
import WinnerLogic from "./components/WinnerLogic";

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const winner = WinnerLogic(history[stepNumber]);
  const xO = isXNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;

    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setIsXNext(!isXNext);
  };

  // uncomment to displayed history

  // const jumpTo = (step) => {
  //   setStepNumber(step);
  //   setIsXNext(step % 2 === 0);
  // };

  // const renderMoves = () =>
  //   history.map((_step, move) => {
  //     const destination = move ? `Go to move #${move}` : "Go to Start";
  //     return (
  //       <li key={move}>
  //         <button onClick={() => jumpTo(move)}>{destination}</button>
  //       </li>
  //     );
  //   });

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="infoWrapper">
        {/* uncomment to displayed history */}
        {/* <ul>{renderMoves()}</ul> */}
        <h3>{winner ? "winner: " + winner : "Next player: " + xO}</h3>
      </div>
    </div>
  );
};

export default App;
