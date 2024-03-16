import React, { useState } from "react";

const WordleBoard = ({ numRows, numCols, board }) => {
  // Function to render the Wordle board
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
    </div>
  );
};

export default WordleBoard;
