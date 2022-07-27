//react
import { ReactNode } from "react";

//lib
import { KeyValue } from "lib/keyboard";
import { CharStatus } from "lib/statuses";

import classnames from "classnames";

type Props = {
  children?: ReactNode;
  value: KeyValue;
  width?: number;
  status?: CharStatus;
  onClick: (value: KeyValue) => void;
};

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    "flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white",
    {
      "bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400":
        !status,
      "bg-slate-400 text-white": status === "absent",
      "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white":
        status === "correct",
      "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 dark:bg-yellow-700 text-white":
        status === "present",
    }
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <button
      style={{ width: `${width}px`, height: "58px" }}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  );
};