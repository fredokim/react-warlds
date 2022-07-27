//components
import { CompletedRow } from "components/grid/CompletedRow";
import { CurrentRow } from "components/grid/CurrentRow";
import { EmptyRow } from "components/grid/EmptyRow";

type Props = {
  guesses: string[];
  currentGuess: string;
};

export const Grid = ({ guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < 6 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};
