"use client";
import React, { useTransition } from "react";
import Image from "next/image";

export default function Home() {

  const handleLoginClick = () => {
    window.open('login', 'Login', 'width=600,height=400');
  };

  const handleRegisterClick = () => {
    window.open('register', 'Register', 'width=600,height=400');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <h1 className="text-gradient">Wordle</h1>
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
