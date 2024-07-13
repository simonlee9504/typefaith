"use client";

import { FC, useContext } from "react";
import { Button } from "@nextui-org/button";
import { ArrowRight } from "react-feather";

import { roundTo2 } from "../utils";

import { TypeContext } from "./typecontext";
import { esther89, TypeBarStatus } from "./typebar";

export interface Result {
  startTime?: Date;
  endTime?: Date;
  correctLetters?: number;
  incorrectLetters?: number;
  extraLetters?: number;
}

export const Results: FC = () => {
  const { result, setResult, setStatus, setText } = useContext(TypeContext);

  if (
    result.startTime == undefined ||
    result.endTime == undefined ||
    result.correctLetters == undefined ||
    result.incorrectLetters == undefined ||
    result.extraLetters == undefined
  ) {
    return;
  }
  const typingTime = (result.endTime.getTime() - result.startTime.getTime()) / 1000;
  const wpm = (result.correctLetters * (60 / typingTime)) / 5;
  const raw =
    ((result.correctLetters + result.incorrectLetters + result.extraLetters) * (60 / typingTime)) /
    5;
  const accuracy =
    (result.correctLetters / (result.correctLetters + result.incorrectLetters)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <p>wpm: {Math.round(wpm)}</p>
      <p>accuracy: {Math.round(accuracy)}%</p>
      <p>raw: {Math.round(raw)}</p>
      <p>time: {roundTo2(typingTime)}s</p>
      <div>
        <Button
          isIconOnly
          variant="bordered"
          onClick={() => {
            setText(esther89);
            setStatus(TypeBarStatus.TYPING);
            setResult({});
          }}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
