import clsx from "clsx";
import { forwardRef, ForwardRefExoticComponent } from "react";

import { typeface } from "../primitives";

import { Caret } from "./caret";

export enum LetterStatus {
  FADED = "faded",
  CORRECT = "correct",
  INCORRECT = "incorrect",
}

export interface LetterProps {
  className?: string;
  letter: string;
  status?: LetterStatus;
  active?: boolean;
  endActive?: boolean;
  incorrectLetter?: string;
  hide?: boolean;
  startOfLine?: boolean;
}

export const Letter: ForwardRefExoticComponent<LetterProps & React.RefAttributes<HTMLDivElement>> =
  forwardRef<HTMLDivElement, LetterProps>(
    (
      {
        className,
        letter,
        status = LetterStatus.FADED,
        active = false,
        endActive = false,
        incorrectLetter = "",
        hide = false,
      },
      ref,
    ) => {
      return (
        <div
          ref={ref}
          className={clsx(hide ? "hidden h-0 w-0 m-0 p-0" : "inline-flex h-9 align-middle")}
        >
          {active && <Caret />}
          <div className={clsx(typeface({ color: status }), className)}>
            {status === LetterStatus.INCORRECT ? incorrectLetter : letter}
          </div>
          {endActive && <Caret />}
        </div>
      );
    },
  );
Letter.displayName = "Letter";
