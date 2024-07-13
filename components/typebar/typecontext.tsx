"use client";

import { createContext } from "react";

import { TypeBarStatus } from "./typebar";
import { Result } from "./results";

export interface TypeContextType {
  status: TypeBarStatus;
  setStatus: (status: TypeBarStatus) => void;
  result: Result;
  setResult: (result: Result) => void;
  text: string;
  setText: (text: string) => void;
}

export const TypeContext = createContext<TypeContextType>({} as TypeContextType);
