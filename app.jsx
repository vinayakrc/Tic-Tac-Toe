import React, { useState } from 'react';
import Square from './Square';
import Scoreboard from './Scoreboard';
import './styles.css';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return null;
};

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = turn ? 'X' : 'O';
    setSquares(newSquares);
    setTurn(!turn);

    const result = calculateWinner(newSquares);
    if (result) {
      setWinner(result.winner);
      setScores((prevScores) => ({
        ...prevScores,
        [result.winner]: prevScores[result.winner] + 1,
      }));
    }
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
  };

  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
      highlight={winner && winner === squares[i]}
      winLine={winner && winner === squares[i] && winner === squares[winner.line[0]]}
    />
  );

  return (
    <div className="game">
      <div className="game-board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <div className="game-info">
        <div className="status">{winner ? `Winner: ${winner}` : `Next player: ${turn ? 'X' : 'O'}`}</div>
        <button onClick={restartGame} className="restart-button">Restart Game</button>
        <Scoreboard scores={scores} />
      </div>
    </div>
  );
};

export default App;
