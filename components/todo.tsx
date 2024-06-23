import { FC } from "react";
import { Snippet } from "@nextui-org/snippet";

export interface ToDoProps {
  className?: string;
  message?: string;
}

export const ToDo: FC<ToDoProps> = ({ className, message = "to be implemented 🫡" }) => {
  return (
    <Snippet className={className} color="secondary" variant="flat">
      {message}
    </Snippet>
  );
};
