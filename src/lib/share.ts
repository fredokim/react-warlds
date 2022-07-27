//constants
import { WORDLE_TITLE } from "constants/strings";

//lib
import { getGuessStatuses } from "lib/statuses";
import { date } from "lib/words";

export const shareStatus = (guesses: string[], lost: boolean) => {
  navigator.clipboard.writeText(
    `${WORDLE_TITLE} ${date} ${lost ? "X" : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses)
  );
};

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess);
      return guess
        .split("")
        .map((letter, i) => {
          switch (status[i]) {
            case "correct":
              return "🟩";
            case "present":
              return "🟨";
            default:
              return "⬛";
          }
        })
        .join("");
    })
    .join("\n");
};
