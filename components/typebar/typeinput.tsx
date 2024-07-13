"use client";

import { FC, useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import clsx from "clsx";

import { typeface } from "../primitives";

import { Letter, LetterProps, LetterStatus } from "./letter";
import { TypeContext } from "./typecontext";
import { TypeBarStatus } from "./typebar";

enum SpecialInputs {
  BACKSPACE,
  SPACE,
  NOOP,
}

const validateInput = (
  keyEvent: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent,
): string | SpecialInputs => {
  if (keyEvent.key.length !== 1 || keyEvent.key === " ") {
    switch (keyEvent.code) {
      case "Backspace":
        return SpecialInputs.BACKSPACE;
      case "Space":
        return SpecialInputs.SPACE;
      default:
        return SpecialInputs.NOOP;
    }
  }

  return keyEvent.key;
};

export interface TypeInputProps {
  className?: string;
  isLoading?: boolean;
}

export const TypeInput: FC<TypeInputProps> = ({ className, isLoading = false }) => {
  const { text, setStatus, result, setResult } = useContext(TypeContext);

  const [initialLoad, setInitialLoad] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState(false);

  const letterRefs = useRef<Array<Array<HTMLDivElement>>>([]);
  const [letterPropsMatrix, setLetterPropsMatrix] = useState<LetterProps[][]>(
    text.split(" ").map((word, wordIndex) =>
      Array.from(word).map((letter, letterIndex) => ({
        letter: letter,
        status: LetterStatus.FADED,
        active: wordIndex === 0 && letterIndex === 0 ? true : false,
        endActive: false,
      })),
    ),
  );
  const [firstLineLetterCoord, setFirstLineLetterCoord] = useState<[number, number]>([0, 0]);

  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);

  const checkLine = useCallback(() => {
    const isWrapping = (previous: HTMLDivElement, current: HTMLDivElement) =>
      previous.getBoundingClientRect().top !== current.getBoundingClientRect().top;

    let previous = null;
    const tempLetterPropsMatrix = letterPropsMatrix;

    for (let wordIndex = 0; wordIndex < letterRefs.current.length; wordIndex++) {
      for (let letterIndex = 0; letterIndex < letterRefs.current[wordIndex].length; letterIndex++) {
        if (tempLetterPropsMatrix[wordIndex][letterIndex].hide) {
          continue;
        }
        if (previous === null) {
          previous = letterRefs.current[wordIndex][letterIndex];

          continue;
        }
        let current = null;

        current = letterRefs.current[wordIndex][letterIndex];
        tempLetterPropsMatrix[wordIndex][letterIndex].startOfLine = isWrapping(previous, current);
        previous = current;
      }
    }
    setLetterPropsMatrix(tempLetterPropsMatrix);
  }, [letterRefs, letterPropsMatrix]);

  useEffect(() => {
    if (initialLoad) {
      letterRefs.current = letterRefs.current.slice(0, letterPropsMatrix.length);
      letterRefs.current.forEach((refs, i) => refs.slice(0, letterPropsMatrix[i].length));
    } else {
      if (inputRef?.current) {
        inputRef.current.focus();
      }
      setInitialLoad(true);
    }
    checkLine();
  }, [letterPropsMatrix, activeWordIndex, initialLoad]);

  useEffect(() => {
    const tempLetterPropsMatrix = letterPropsMatrix;
    const activeLetter = tempLetterPropsMatrix[activeWordIndex][activeLetterIndex];

    if (
      activeLetter.startOfLine &&
      !(
        activeWordIndex === firstLineLetterCoord[0] && activeLetterIndex === firstLineLetterCoord[1]
      )
    ) {
      const hiddenLetterPropsMatrix = tempLetterPropsMatrix.map((word, wordIndex) =>
        word.map((letter, letterIndex) => ({
          ...letter,
          hide:
            wordIndex < firstLineLetterCoord[0] ||
            (wordIndex === firstLineLetterCoord[0] && letterIndex < firstLineLetterCoord[1]),
        })),
      );

      setLetterPropsMatrix(hiddenLetterPropsMatrix);
      setFirstLineLetterCoord([activeWordIndex, activeLetterIndex]);
    }
  }, [activeWordIndex, activeLetterIndex]);

  const handleInput = (letter: string | SpecialInputs) => {
    if (letter === SpecialInputs.NOOP) {
      return;
    }
    // first letter input
    if (!result.startTime && activeWordIndex === 0 && activeLetterIndex === 0) {
      const tempResult = result;

      tempResult.startTime = new Date();
      setResult(tempResult);
    }

    const tempLetterPropsMatrix = letterPropsMatrix;
    const activeWord = tempLetterPropsMatrix[activeWordIndex];
    const activeLetter = activeWord[activeLetterIndex];
    const EXTRA_LETTER = "EXTRA_LETTER";

    if (letter === SpecialInputs.BACKSPACE) {
      if (activeWordIndex === 0 && activeLetterIndex === 0) {
        // do nothing
      } else if (
        activeLetter.status === LetterStatus.INCORRECT &&
        activeLetter.letter === EXTRA_LETTER
      ) {
        tempLetterPropsMatrix[activeWordIndex].splice(activeLetterIndex, 1);
        tempLetterPropsMatrix[activeWordIndex][activeLetterIndex - 1].endActive = true;
        setActiveLetterIndex((prev) => prev - 1);
      } else if (activeLetter.endActive) {
        activeLetter.active = true;
        activeLetter.endActive = false;
        activeLetter.status = LetterStatus.FADED;
      } else if (activeLetterIndex === 0) {
        tempLetterPropsMatrix[activeWordIndex][activeLetterIndex].active = false;
        tempLetterPropsMatrix[activeWordIndex - 1][
          tempLetterPropsMatrix[activeWordIndex - 1].length - 1
        ].endActive = true;
        setActiveWordIndex((prev) => prev - 1);
        setActiveLetterIndex(tempLetterPropsMatrix[activeWordIndex - 1].length - 1);
      } else {
        tempLetterPropsMatrix[activeWordIndex][activeLetterIndex].active = false;
        tempLetterPropsMatrix[activeWordIndex][activeLetterIndex - 1].active = true;
        tempLetterPropsMatrix[activeWordIndex][activeLetterIndex - 1].status = LetterStatus.FADED;
        setActiveLetterIndex((prev) => prev - 1);
      }
      setLetterPropsMatrix(tempLetterPropsMatrix);
      forceUpdate();

      return;
    } else if (letter === SpecialInputs.SPACE) {
      activeLetter.active = false;
      activeLetter.endActive = false;
      if (activeWordIndex < tempLetterPropsMatrix.length - 1) {
        tempLetterPropsMatrix[activeWordIndex + 1][0].active = true;
        setActiveWordIndex((prev) => prev + 1);
        setActiveLetterIndex(0);
      } else {
        // typing finished (last word spaced)
        const tempResult = result;

        tempResult.correctLetters = 0;
        tempResult.incorrectLetters = 0;
        tempResult.extraLetters = 0;
        for (const word of letterPropsMatrix) {
          for (const letter of word) {
            if (letter.status === LetterStatus.CORRECT) {
              tempResult.correctLetters += 1;
            } else if (letter.status === LetterStatus.INCORRECT) {
              if (letter.letter == EXTRA_LETTER) {
                tempResult.extraLetters += 1;
              } else {
                tempResult.incorrectLetters += 1;
              }
            }
          }
          // for spaces
          word[word.length - 1].incorrectLetter != EXTRA_LETTER
            ? (tempResult.correctLetters += 1)
            : (tempResult.incorrectLetters += 1);
        }
        const matrixLength = letterPropsMatrix.length;

        // undo last space
        letterPropsMatrix[matrixLength - 1][letterPropsMatrix[matrixLength - 1].length - 1]
          .incorrectLetter != EXTRA_LETTER
          ? (tempResult.correctLetters -= 1)
          : (tempResult.incorrectLetters -= 1);
        tempResult.endTime = new Date();
        setResult(tempResult);
        setStatus(TypeBarStatus.RESULTS);
      }
    } else if (activeLetter.endActive) {
      activeLetter.endActive = false;
      tempLetterPropsMatrix[activeWordIndex].push({
        letter: EXTRA_LETTER,
        status: LetterStatus.INCORRECT,
        active: false,
        endActive: true,
        incorrectLetter: letter,
      });
      setActiveLetterIndex((prev) => prev + 1);
    } else if (activeWord.length === activeLetterIndex + 1) {
      activeLetter.active = false;
      activeLetter.endActive = true;
      if (letter === activeLetter.letter) {
        activeLetter.status = LetterStatus.CORRECT;
      } else {
        activeLetter.status = LetterStatus.INCORRECT;
        activeLetter.incorrectLetter = letter;
      }
    } else {
      activeLetter.active = false;
      if (letter === activeLetter.letter) {
        activeLetter.status = LetterStatus.CORRECT;
      } else {
        activeLetter.status = LetterStatus.INCORRECT;
        activeLetter.incorrectLetter = letter;
      }
      tempLetterPropsMatrix[activeWordIndex][activeLetterIndex + 1].active = true;
      setActiveLetterIndex((prev) => prev + 1);
    }
    setLetterPropsMatrix(tempLetterPropsMatrix);
    forceUpdate();
  };

  return (
    <div className={className}>
      <div
        className="relative h-[6.75rem] overflow-hidden my-4 rounded-md"
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.focus()}
        onKeyDown={() => inputRef.current?.focus()}
      >
        <div
          className={clsx(
            inputFocused ? "hidden" : "",
            "absolute w-full h-full top-0 left-0 place-content-center z-10",
          )}
        >
          {initialLoad || isLoading ? (
            <p className={clsx("text-lg", typeface())}>click to focus</p>
          ) : (
            <Spinner color="default" />
          )}
        </div>
        <div
          ref={inputRef}
          className={clsx(
            "relative w-full flex flex-wrap justify-start outline-none cursor-text",
            inputFocused ? "" : "bg-white dark:bg-black opacity-30 blur-[4px]",
            className,
          )}
          role="button"
          tabIndex={0}
          onBlur={() => setInputFocused(false)}
          onFocus={() => setInputFocused(true)}
          onKeyDown={(key) => handleInput(validateInput(key))}
        >
          {letterPropsMatrix?.map((word, wordIndex) => (
            <div key={wordIndex} className={word.every((letter) => !letter.hide) ? "mx-2" : ""}>
              {word.map((letterProp, letterIndex) => {
                return (
                  <Letter
                    key={letterIndex}
                    ref={(el) => {
                      if (el !== null) {
                        if (letterIndex === 0) {
                          letterRefs.current[wordIndex] = [el];
                        } else {
                          letterRefs.current[wordIndex][letterIndex] = el;
                        }
                      }
                    }}
                    {...letterProp}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
