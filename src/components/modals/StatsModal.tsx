//components
import { BaseModal } from "components/modals/BaseModal";

//lib
import { shareStatus } from "lib/share";

//constatns
import { RETRY_TEXT, SHARE_TEXT, STATISTICS_TITLE } from "constants/strings";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];

  isGameLost: boolean;
  isGameWon: boolean;
  handleShare: () => void;
  onRestart: () => void;
};

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  isGameLost,
  isGameWon,
  handleShare,
  onRestart,
}: Props) => {
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={onRestart}
            >
              {RETRY_TEXT}
            </button>
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              shareStatus(guesses, isGameLost);
              handleShare();
            }}
          >
            {SHARE_TEXT}
          </button>
        </div>
      )}
    </BaseModal>
  );
};
