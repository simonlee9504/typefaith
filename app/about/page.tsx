import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <section>
      <div>
        <h1 className={title()}>About</h1>
      </div>

      <div className="mt-8">
        <p>
          Inspired by sites like{" "}
          <Link isExternal className="inline" href={siteConfig.links.monkeytype}>
            monkeytype
          </Link>
          ,{" "}
          <Link isExternal className="inline" href={siteConfig.links.notion}>
            Notion
          </Link>
          , and{" "}
          <Link isExternal className="inline" href={siteConfig.links.quizlet}>
            Quizlet
          </Link>
          .
        </p>
        <p>
          <b>typefaith</b> aims to combine all of these tools to promote Bible reading, study, and
          memorization through the fun of typing.
        </p>
      </div>
    </section>
  );
}
