import React from "react";

const Header = ({ score, email, handleLogOutClick }) => {
  return (
    <div className="data-and-button-container">
        <div className="text-data-gradient">
            <p>Email:  {email}</p>
            <p>Score:  {score}</p>
        </div>
        <div>
            <button onClick={handleLogOutClick} className="small-button">
            <span>Log Out</span>
        </button>
        </div>
    </div>
  );
};

export default Header;
