import { FC } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { HeartFilledIcon } from "./icons";

import { siteConfig } from "@/config/site";

export interface FeedbackProps {
  className?: string;
}

export const Feedback: FC<FeedbackProps> = ({ className }) => {
  return (
    <Button
      isExternal
      as={Link}
      className={clsx("text-sm font-normal text-default-600 bg-default-100", className)}
      href={siteConfig.links.feedback}
      startContent={<HeartFilledIcon className="text-danger" />}
      variant="flat"
    >
      Feedback
    </Button>
  );
};
