import { WORDS } from "../constants/wordlist";
import { VALIDGUESSES } from "../constants/validGuesses";
import { fillZero } from "../lib/utils";

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  );
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

export const getWordOfDay = () => {
  const index = Math.floor(Math.random() * WORDS.length);
  return {
    solution: WORDS[index].toUpperCase(),
    solutionIndex: index,
  };
};

export const getCompleteDay = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  return {
    date: `${year}-${fillZero(2, month)}-${fillZero(2, date)} ${fillZero(
      2,
      hour
    )}:${fillZero(2, minutes)}:${fillZero(2, seconds)}`,
  };
};

export const resetWord = () => {
  const newSolution = getWordOfDay().solution;
  solution = newSolution;
};

export let { solution, solutionIndex } = getWordOfDay();

export const { date } = getCompleteDay();
