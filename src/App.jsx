import { useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./wordsList.json";

function App() {
  const [wordToGuess, setWordToGuess] = useState(
    () => words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState([]);
  const inCorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  console.log(wordToGuess);

  const addGuessedLetter = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  };
  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);
  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Lose Win</div>
      <HangmanDrawing
        numberOfGuesses={inCorrectLetters.length}
      ></HangmanDrawing>
      <HangmanWord
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      ></HangmanWord>
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          activeLetter={guessedLetters.filter((l) => wordToGuess.includes(l))}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        ></Keyboard>
      </div>
    </div>
  );
}

export default App;
