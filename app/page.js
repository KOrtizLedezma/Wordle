"use client";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import Header from "./Components/Header";
import LoginForm from "./Components/LoginForm";
import Tittle from "./Components/Tittle";
import WordleBoard from "./Components/WordleBoard";
import Keyboard from "./Components/Keyboard";

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

// Get the Firestore instance
console.log("Initializing Firestore...");
const db = getFirestore(app);
console.log("Firestore initialized.");

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [board, setBoard] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    const handleKeyDown = (event) => {
      handleKeyPress(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      unsubscribe();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUser(userDoc.data());
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const changeBoard = async () => {
    setBoard([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]);
  }

  const handleLoginClick = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error signing in:", error);
      handleAuthError(error.code);
      setIsLoggedIn(false);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      setIsLoggedIn(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleRegisterClick = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        score: 0
      });

      console.log("User registered successfully!");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error registering user:", error);
      handleAuthError(error.code);
      setIsLoggedIn(false);
    }
  };

  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        setError("Invalid email format. Please enter a valid email.");
        break;
      case "auth/wrong-password":
      case "auth/invalid-credential":
        setError("Invalid credentials. Please try again.");
        break;
      case "auth/email-already-in-use":
        setError("Email already in use. Please enter a different email.");
        break;
      default:
        setError("An error occurred. Please try again later.");
        break;
    }
  };

  const handleKeyPress = (event) => {
    if (event && event.keyCode && event.type === 'keydown') {
      const keyPressed = event.key.toUpperCase();
      const isAlphabetic = /[A-Z]/.test(keyPressed);
      const isBackspace = event.keyCode === 8;
      const isEnter = event.keyCode === 13;
      const isTabOrAlt = event.keyCode === 9 || event.keyCode === 18 || event.keyCode === 17 || event.keyCode === 16;
  
      let currentRow = board.findIndex(row => row.includes(''));
      let canInputLetters = true;
  
      if (currentRow === -1) {
        // All rows are filled, do not allow further input
        canInputLetters = false;
      } else {
        // Find the first empty column in the current row
        const currentCol = board[currentRow].indexOf('');
  
        // Check if the current row is already filled
        const wordLength = board[currentRow].filter(cell => cell !== '').length;
        if (wordLength === 5) {
          canInputLetters = false;
        }
      }
  
      if (isAlphabetic && canInputLetters) {
        const newBoard = [...board];
        let currentCol = 0;
  
        currentCol = newBoard[currentRow].indexOf('');
  
        if (currentCol < 5) {
          newBoard[currentRow][currentCol] = keyPressed;
          setBoard(newBoard);
  
          // Check if the current row is now filled
          const wordLength = newBoard[currentRow].filter(cell => cell !== '').length;
          if (wordLength === 5) {
            canInputLetters = false;
          }
        }
      }
  
      // Handle backspace
      if (isBackspace) {
        const newBoard = [...board];
        let currentCol = 0;
  
        currentCol = newBoard[currentRow].lastIndexOf('');
        if (currentCol === -1) {
          currentCol = 4;
        } else {
          currentCol--;
        }
  
        if (currentCol >= 0) {
          newBoard[currentRow][currentCol] = '';
          setBoard(newBoard);
          canInputLetters = true; // Allow letter input after backspace
        }
      }
  
      // Handle enter
      if (isEnter) {
        const newBoard = [...board];
        const wordLength = newBoard[currentRow].filter(cell => cell !== '').length;
        if (wordLength === 5) {
          // Handle word submission logic here
          // ...
          const currentWord = newBoard[currentRow].join('');
          console.log('Submitted word:', currentWord);
          // Implement your word submission logic here
          currentRow++;
          canInputLetters = true; // Allow letter input after Enter
        } else {
          // Word is not complete, don't allow newline
          event.preventDefault();
        }
      }
  
      if (!isAlphabetic && !isBackspace && !isEnter && !isTabOrAlt) {
        event.preventDefault();
      }
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <main className="flex min-h-screen flex-col items-center bg-black">
          <Header email={user ? user.email : ""} score={user ? user.score : 0} handleLogOutClick={handleLogoutClick} />
          <Tittle />
          <div>
            <WordleBoard numRows={6} numCols={5} board={board} />
          </div>
          <Keyboard />
        </main>
      </div>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLoginClick={handleLoginClick}
          handleRegisterClick={handleRegisterClick}
          error={error}
        />
      </main>
    );
  }
}