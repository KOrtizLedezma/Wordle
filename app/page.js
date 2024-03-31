"use client";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//Components
import Header from "./Components/Header";
import LoginForm from "./Components/LoginForm";
import Tittle from "./Components/Tittle";
import WordleBoard from "./Components/WordleBoard";
import Keyboard from "./Components/Keyboard";

// API KEYS & DATA
const firebaseApiKey = process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.NEXT_PUBLIC_REACT_APP_authDomain;
const firebaseProjectID = process.env.NEXT_PUBLIC_REACT_APP_projectId;
const firebaseStorageBucket = process.env.NEXT_PUBLIC_REACT_APP_storageBucket;
const firebaseMessagingSenderId = process.env.NEXT_PUBLIC_REACT_APP_messagingSenderId;
const firebaseAppId = process.env.NEXT_PUBLIC_REACT_APP_appId;
const wordnikApiKey = process.env.NEXT_PUBLIC_REACT_APP_WORDNIK_API_KEY;

// Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectID,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId
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
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [board, setBoard] = useState(Array(6).fill().map(() => Array(5).fill('')));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [targetWord, setTargetWord] = useState('HONEY');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  //Wordnik
  const axios = require('axios');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        //setIsLoggedIn(false);
        setUser(null);
      }
    });

    // Generate a new target word when the game starts
    getRandomWordOfLength(5).then(word => {
      setTargetWord(word);
    });

    return () => {
      unsubscribe();
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

  const handleLoginClick = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      //setIsLoggedIn(true);
    } catch (error) {
      console.error("Error signing in:", error);
      handleAuthError(error.code);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      //setIsLoggedIn(false);
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
        score: 0,
        uid: user.uid
      });

      console.log("User registered successfully!");
      //setIsLoggedIn(true);
    } catch (error) {
      console.error("Error registering user:", error);
      handleAuthError(error.code);
      //setIsLoggedIn(false);
    }
  };

  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        setError("Invalid email format. Please enter a valid email.");
        break;
      case "auth/wrong-password":
        setError("Invalid password. Please try again.");
        break;
      case "auth/invalid-credential":
        setError("Invalid credentials. Please try again.");
        break;
      case "auth/email-already-in-use":
        setError("Email already in use. Please enter a different email.");
        break;
      case "(auth/weak-password)":
        setError("Password should be at least 6 characters.");
        break;
      default:
        setError("An error occurred. Please try again later.");
        break;
    }
  };

  const handleInput = (letter) => {
    // Handle user input
    if (currentCol < 5) {
      const newBoard = [...board];
      newBoard[currentRow][currentCol] = letter;
      setBoard(newBoard);
      setCurrentCol(currentCol + 1);
    }
  };

  const handleBackspace = () => {
    // Handle backspace
    if (currentCol > 0) {
      const newBoard = [...board];
      newBoard[currentRow][currentCol - 1] = '';
      setBoard(newBoard);
      setCurrentCol(currentCol - 1);
    }
  };

  const handleEnter = async () => {
    // Handle enter key
    if (currentCol === 5) {
      const guess = board[currentRow].join('');
      const isValid = await isValidWord(guess.toLowerCase());
      if (isValid) {
        checkWin(guess);
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);
      } else {
        alert('Invalid word!');
      }
    }
  };

  const isValidWord = async (word) => {
    const apiKey = wordnikApiKey;
    const apiUrl = `https://api.wordnik.com/v4/word.json/${word}/definitions?api_key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        return response.status === 200 && response.data.length > 0;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
};

  const getRandomWordOfLength = async (length) => {
    const apiKey = wordnikApiKey;
    const apiUrl = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minLength=${length}&maxLength=${length}&api_key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        console.log(response.data.word);
        return response.data.word.toUpperCase();;
      } else {
        console.error('Error:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  const checkWin = (guess) => {
    if (guess === targetWord) {
      setWon(true);
      setGameOver(true);
      // Update user's score in Firestore
      updateUserScore(user.score + 1);
    } else if (currentRow === 5) {
      setGameOver(true);
    }
  };

  const updateUserScore = async () => {
    console.log("Here");
    try {
      if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        
        // Get the current score from the user document
        const userDoc = await getDoc(userRef);
        const currentScore = userDoc.data().score;
  
        // Calculate the new score by adding 10 to the current score
        const newScore = currentScore + 10;
  
        // Update the user document with the new score
        await setDoc(userRef, { score: newScore }, { merge: true });
  
        console.log("User score updated successfully!");
      } else {
        console.error("No user is currently logged in.");
      }
    } catch (error) {
      console.error("Error updating user score:", error);
    }
  };
  
  const resetGame = () => {
    setBoard(Array(6).fill().map(() => Array(5).fill('')));
    setCurrentRow(0);
    setCurrentCol(0);
    getRandomWordOfLength(5).then(word => {setTargetWord(word)});
    setGameOver(false);
    setWon(false);
  };

  if (user) {
    return (
      <div>
        <main className="flex min-h-screen flex-col items-center bg-black">
          <Header email={user ? user.email : ""} score={user ? user.score : 0} handleLogOutClick={handleLogoutClick} />
          <Tittle />
          <div>
            <WordleBoard board={board} won={won} targetWord={targetWord} gameOver={gameOver} />
          </div>
          <Keyboard
            handleInput={handleInput}
            handleBackspace={handleBackspace}
            handleEnter={handleEnter}
          />
          {gameOver && (
            <div>
              {won ? (
                console.log("Congratulations! You won!")
              ) : (
                console.log("Game over. The word was {targetWord}.")
              )}

              {won &&(
                <button className="play-again-button" onClick={resetGame}>Play Again</button>
              )}
              
            </div>
          )}
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