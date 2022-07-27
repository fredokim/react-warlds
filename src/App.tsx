//react
import { useEffect, useState } from "react";

//component
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { StatsModal } from "./components/modals/StatsModal";

//constants
import {
  CORRECT_WORD_MESSAGE,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WIN_MESSAGES,
  WORDLE_TITLE,
  WORD_NOT_FOUND_MESSAGE,
} from "constants/strings";

//lib
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "lib/localStorage";
import {
  isWinningWord,
  isWordInWordList,
  resetWord,
  solution,
} from "lib/words";

const ALERT_TIME_MS = 2000;

function App() {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] =
    useState<boolean>(false);

  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isGameLost, setIsGameLost] = useState<boolean>(false);

  const [successAlert, setSuccessAlert] = useState<string>("");

  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.solution !== solution) {
      return [];
    }
    const gameWasWon = loaded.guesses.includes(solution);
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true);
    }
    return loaded.guesses;
  });

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onRestart = () => {
    setIsGameWon(false);
    setIsGameLost(false);
    resetWord();
    setGuesses([]);
    setIsStatsModalOpen(false);
  };

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return;
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true);
      return setTimeout(() => {
        setIsNotEnoughLetters(false);
      }, ALERT_TIME_MS);
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, ALERT_TIME_MS);
    }

    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        setIsGameLost(true);
      }
    }
  };

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      );
      setTimeout(() => {
        setSuccessAlert("");
        setIsStatsModalOpen(true);
      }, ALERT_TIME_MS);
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, ALERT_TIME_MS);
    }
  }, [isGameWon, isGameLost]);

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-12 mt-12 ">
        <h1 className="text-xl grow font-bold dark:text-white text-center">
          {WORDLE_TITLE}
        </h1>
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        onRestart={onRestart}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE);
          return setTimeout(() => setSuccessAlert(""), ALERT_TIME_MS);
        }}
      />

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ""}
        variant="success"
      />
    </div>
  );
}

export default App;
