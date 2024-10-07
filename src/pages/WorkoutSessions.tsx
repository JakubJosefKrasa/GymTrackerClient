import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/DefaultLayout";

export default function WorkoutSessionsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Tréninky</h1>
        </div>
      </section>
    </DefaultLayout>
  );
}