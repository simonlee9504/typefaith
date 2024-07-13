"use client";

import { FC, useState } from "react";

import { TypeInput } from "./typeinput";
import { TypeContext } from "./typecontext";
import { Result, Results } from "./results";

const john316 =
  "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";

export const esther89 =
  "The king's scribes were summoned at that time, in the third month, which is the month of Sivan, on the twenty-third day. And an edict was written, according to all that Mordecai commanded concerning the Jews, to the satraps and the governors and the officials of the provinces from India to Ethiopia, 127 provinces, to each province in its own script and to each people in its own language, and also to the Jews in their script and their language.";

export interface TypeBarProps {
  className?: string;
}

export enum TypeBarStatus {
  RESULTS,
  TYPING,
}

export const TypeBar: FC<TypeBarProps> = ({ className }) => {
  const [status, setStatus] = useState(TypeBarStatus.TYPING);
  const [result, setResult] = useState<Result>({});
  const [text, setText] = useState(john316);

  return (
    <TypeContext.Provider value={{ status, setStatus, result, setResult, text, setText }}>
      {status === TypeBarStatus.TYPING && <TypeInput className={className} />}
      {status === TypeBarStatus.RESULTS && <Results />}
    </TypeContext.Provider>
  );
};
