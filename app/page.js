"use client";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTsNSIa2N4b0DAQPL84HDcg2QpAoz9k8w",
  authDomain: "wordle-ae5fe.firebaseapp.com",
  projectId: "wordle-ae5fe",
  storageBucket: "wordle-ae5fe.appspot.com",
  messagingSenderId: "809603437010",
  appId: "1:809603437010:web:daae7949b1d064931d380b"
};

// Initialize Firebase app
console.log("Initializing Firebase app...");
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized.");

// Get the Auth instance
console.log("Getting Auth instance...");
const auth = getAuth(app);
console.log("Auth instance obtained:", auth);

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLoginClick = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      // Redirect or handle successful login
    } catch (error) {
      console.error("Error signing in:", error);
      handleAuthError(error.code);
    }
  };

  const handleRegisterClick = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully!");
      // Redirect or handle successful registration
    } catch (error) {
      console.error("Error registering user:", error);
      handleAuthError(error.code);
    }
  };

  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        setError("Invalid email format. Please enter a valid email.");
        break;
      case "auth/invalid-credential":
        setError("Invalid credentials. Please try again.");
        break;
      default:
        setError("An error occurred. Please try again later.");
        break;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div>
        <h1 className="tittle-gradient">Wordle</h1>
      </div>
      <div>
        <form>
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </form>
      </div>
      <div>
        <div>
          <button onClick={handleLoginClick} className="button">
            <span>Login</span>
          </button>
        </div>
        <div>
          <button onClick={handleRegisterClick} className="button">
            <span>Register</span>
          </button>
        </div>
      </div>
      <div>
        {error && <p className="error-gradient">{error}</p>} {}
      </div>
    </main>
  );
}
