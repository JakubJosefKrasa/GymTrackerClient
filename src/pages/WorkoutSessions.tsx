import DefaultLayout from "@/layouts/DefaultLayout";
import { title } from "@/components/primitives";
import WorkoutSessionsTable from "@/components/workoutSessions/WorkoutSessionsTable";

export default function WorkoutSessionsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center w-full">
          <h1 className={title()}>Tréninky</h1>
          <WorkoutSessionsTable />
        </div>
      </section>
    </DefaultLayout>
  );
}
