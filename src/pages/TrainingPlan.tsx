import { ReactNode } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/alert";

import DefaultLayout from "@/layouts/DefaultLayout";
import { title } from "@/components/primitives";
import TrainingPlanTable from "@/components/trainingPlan/TrainingPlanTable";

import { useGetTrainingPlanById } from "@/api/trainingPlansHttp";

export default function TrainingPlanPage() {
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetTrainingPlanById(
    Number(id)
  );

  let content: ReactNode;

  if (isLoading) {
    content = <Spinner size="lg" />;
  } else if (isError) {
    content = (
      <div className="flex place-content-center mt-12">
        <Alert color="danger" title="Tréninkový plán se nepodařilo načíst" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <>
        <h1 className={title()}>{data.trainingPlanName}</h1>
        <TrainingPlanTable trainingPlanExercises={data} isError={isError} />
      </>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center w-full">
          {content}
        </div>
      </section>
    </DefaultLayout>
  );
}
