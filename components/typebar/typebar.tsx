import { FC } from "react";

import { TypeInput } from "./typeinput";

const john316 =
  "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
const esther89 =
  "The king's scribes were summoned at that time, in the third month, which is the month of Sivan, on the twenty-third day. And an edict was written, according to all that Mordecai commanded concerning the Jews, to the satraps and the governors and the officials of the provinces from India to Ethiopia, 127 provinces, to each province in its own script and to each people in its own language, and also to the Jews in their script and their language.";

const galtest = `Paul, an apostle sent not from men nor by a man, but by Jesus Christ and God the Father, who raised him from the dead and all the brothers and sisters with me, To the churches in Galatia: Grace and peace to you from God our Father and the Lord Jesus Christ, who gave himself for our sins to rescue us from the present evil age, according to the will of our God and Father, to whom be glory for ever and ever. Amen.`;

export interface TypeBarProps {
  className?: string;
}

export const TypeBar: FC<TypeBarProps> = ({ className }) => {
  let text = galtest.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  text = text.replace(/(\r\n|\n|\r)/gm, "");
  text = text.replace(/-/gi, " ");
  text = text.toLowerCase();

  return <TypeInput className={className} text={text} />;
};
