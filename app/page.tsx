import { subtitle, title } from "@/components/primitives";
import { TypeBar } from "@/components/typebar/typebar";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="inline-block max-w-lg text-center justify-center mb-12">
        <h1 className={title()}>Welcome to typefaith</h1>
        <p className={subtitle()}>just start typing</p>
        <TypeBar />
      </div>
    </section>
  );
}
