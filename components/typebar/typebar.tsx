import { FC } from "react";

import { ToDo } from "../todo";

export interface ToDoProps {
  className?: string;
}

export const TypeBar: FC<ToDoProps> = ({ className }) => {
  return <ToDo className={className} />;
};
