import { title } from "@/components/primitives";
import { ToDo } from "@/components/todo";

export default function AboutPage() {
  return (
    <section>
      <div>
        <h1 className={title()}>Settings</h1>
      </div>
      <div className="mt-8">
        <p>
          <ToDo />
        </p>
      </div>
    </section>
  );
}
