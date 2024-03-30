import React from "react";

const WordleBoard = ({ board, won, targetWord, gameOver }) => {
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="wordle-row">
        {row.map((cell, colIndex) => (
          <div key={colIndex} className="wordle-cell">
            {cell}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="wordle-board">
      {renderBoard()}
      {gameOver && (
        <div>
          {won ? (
                console.log("Congratulations! You won!")
              ) : (
                console.log("Game over. The word was {targetWord}.")
              )}
        </div>
      )}
    </div>
  );
};

export default WordleBoard;
