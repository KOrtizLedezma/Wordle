import React from "react";

const Keyboard = ({ handleInput, handleBackspace, handleEnter }) => {
  return (
    <>
      <div className="keyboard-first">
        <div className="key" onClick={() => handleInput('Q')}>Q</div>
        <div className="key" onClick={() => handleInput('W')}>W</div>
        <div className="key" onClick={() => handleInput('E')}>E</div>
        <div className="key" onClick={() => handleInput('R')}>R</div>
        <div className="key" onClick={() => handleInput('T')}>T</div>
        <div className="key" onClick={() => handleInput('Y')}>Y</div>
        <div className="key" onClick={() => handleInput('U')}>U</div>
        <div className="key" onClick={() => handleInput('I')}>I</div>
        <div className="key" onClick={() => handleInput('O')}>O</div>
        <div className="key" onClick={() => handleInput('P')}>P</div>
      </div>
      <div className="keyboard-second">
        <div className="key" onClick={() => handleInput('A')}>A</div>
        <div className="key" onClick={() => handleInput('S')}>S</div>
        <div className="key" onClick={() => handleInput('D')}>D</div>
        <div className="key" onClick={() => handleInput('F')}>F</div>
        <div className="key" onClick={() => handleInput('G')}>G</div>
        <div className="key" onClick={() => handleInput('H')}>H</div>
        <div className="key" onClick={() => handleInput('J')}>J</div>
        <div className="key" onClick={() => handleInput('K')}>K</div>
        <div className="key" onClick={() => handleInput('L')}>L</div>
      </div>
      <div className="keyboard-third">
        <div className="key-large" onClick={handleEnter}>↵</div>
        <div className="key" onClick={() => handleInput('Z')}>Z</div>
        <div className="key" onClick={() => handleInput('X')}>X</div>
        <div className="key" onClick={() => handleInput('C')}>C</div>
        <div className="key" onClick={() => handleInput('V')}>V</div>
        <div className="key" onClick={() => handleInput('B')}>B</div>
        <div className="key" onClick={() => handleInput('N')}>N</div>
        <div className="key" onClick={() => handleInput('M')}>M</div>
        <div className="key-large" onClick={handleBackspace}>⌫</div>
      </div>
    </>
  );
};

export default Keyboard;
