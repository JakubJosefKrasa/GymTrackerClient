import { UseDisclosureProps } from "@heroui/modal";

import DeleteItemModal from "@/components/reusable/DeleteItemModal";

import { ExerciseType } from "@/types/types";

import { useRemoveExerciseFromTrainingPlanMutation } from "@/api/trainingPlansHttp";

type RemoveExerciseFromTrainingPlanModalProps = UseDisclosureProps & {
  exercise: ExerciseType | null;
  trainingPlanId: number;
};

export default function RemoveExerciseFromTrainingPlanModal({
  isOpen,
  onClose,
  exercise,
  trainingPlanId,
}: RemoveExerciseFromTrainingPlanModalProps) {
  const { mutate: removeExerciseFromTrainingPlan, isPending } =
    useRemoveExerciseFromTrainingPlanMutation();

  async function handleRemoveExerciseFromTrainingPlan() {
    if (exercise !== null && onClose !== undefined) {
      removeExerciseFromTrainingPlan({
        exerciseId: exercise.id,
        trainingPlanId,
      });
      onClose();
    }
  }

  return (
    <DeleteItemModal
      isOpen={isOpen}
      onClose={onClose}
      headerText={`Opravdu si přejete odebrat cvik ${exercise?.exerciseName} z tréninkového plánu?`}
      bodyText="Akce se nedá odvolat a cvik bude odebrán"
      confirmButtonText="Odebrat"
      onDeleteItem={handleRemoveExerciseFromTrainingPlan}
      isLoading={isPending}
    />
  );
}
