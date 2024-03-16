import React, { useState } from "react";

const Keyboard = () => {
  return (
    <>
        <div className="keyboard-first">
            <div className="key">Q</div>
            <div className="key">W</div>
            <div className="key">E</div>
            <div className="key">R</div>
            <div className="key">T</div>
            <div className="key">Y</div>
            <div className="key">U</div>
            <div className="key">I</div>
            <div className="key">O</div>
            <div className="key">P</div>
        </div>
        <div className="keyboard-second">
            <div className="key">A</div>
            <div className="key">S</div>
            <div className="key">D</div>
            <div className="key">F</div>
            <div className="key">G</div>
            <div className="key">H</div>
            <div className="key">J</div>
            <div className="key">K</div>
            <div className="key">L</div>
        </div>
        <div className="keyboard-third">
            <div className="key-large">↵</div>
            <div className="key">Z</div>
            <div className="key">X</div>
            <div className="key">C</div>
            <div className="key">V</div>
            <div className="key">B</div>
            <div className="key">N</div>
            <div className="key">M</div>
            <div className="key-large">⌫</div>
        </div>
    </>
  );
};

export default Keyboard;