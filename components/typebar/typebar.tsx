import { FC } from "react";

import { TypeInput } from "./typeinput";

const john316 =
  "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
const esther89 =
  "The king's scribes were summoned at that time, in the third month, which is the month of Sivan, on the twenty-third day. And an edict was written, according to all that Mordecai commanded concerning the Jews, to the satraps and the governors and the officials of the provinces from India to Ethiopia, 127 provinces, to each province in its own script and to each people in its own language, and also to the Jews in their script and their language.";

export interface TypeBarProps {
  className?: string;
}

export const TypeBar: FC<TypeBarProps> = ({ className }) => {
  return <TypeInput className={className} text={Math.random() > 0.5 ? esther89 : john316} />;
};
