"use client";
import React, { useTransition } from "react";

export default function Home() {

  const handleLoginClick = () => {
    
  };

  const handleRegisterClick = () => {
    
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div>
        <h1 className="tittle-gradient" >Wordle</h1>
      </div>
      <div>
        <form>
          <div className="input-container">
            <input
              type="Email"
              name="Email"
              placeholder="Email"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
        </form>
      </div>
      <div>
        <button onClick={handleLoginClick} class="button">
          <span>Login</span>
        </button>

        <button onClick={handleRegisterClick} class="button">
          <span>Register</span>
        </button>
      </div>
    </main>
  );
}
