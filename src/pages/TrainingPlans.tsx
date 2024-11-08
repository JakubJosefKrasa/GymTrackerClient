import DefaultLayout from "@/layouts/DefaultLayout";
import { title } from "@/components/primitives";
import TrainingPlansTable from "@/components/trainingPlans/TrainingPlansTable";

export default function TrainingPlansPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center w-full">
          <h1 className={title()}>Tréninkové plány</h1>
          <TrainingPlansTable />
        </div>
      </section>
    </DefaultLayout>
  );
}
