//copmonents
import { Cell } from "components/grid/Cell";

//lib
import { getGuessStatuses } from "lib/statuses";

type Props = {
  guess: string;
};

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess);

  return (
    <div className="flex justify-center mb-1">
      {guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  );
};
