import { UseDisclosureProps } from "@nextui-org/modal";

import DeleteItemModal from "@/components/reusable/DeleteItemModal";

import { ExerciseType } from "@/types/types";

import { useDeleteExerciseMutation } from "@/api/exercisesHttp";

type DeleteExerciseModalProps = UseDisclosureProps & {
  exercise: ExerciseType | null;
};

export default function DeleteExerciseModal({
  isOpen,
  onClose,
  exercise,
}: DeleteExerciseModalProps) {
  const { mutate: deleteExercise, isPending } = useDeleteExerciseMutation();

  async function handleExerciseDeletion() {
    if (exercise !== null && onClose !== undefined) {
      deleteExercise(exercise);
      onClose();
    }
  }

  return (
    <DeleteItemModal
      isOpen={isOpen}
      onClose={onClose}
      headerText={`Opravdu si přejete smazat cvik ${exercise?.exerciseName}?`}
      bodyText="Akce se nedá odvolat a cvik bude smazán"
      confirmButtonText="Smazat"
      onDeleteItem={handleExerciseDeletion}
      isLoading={isPending}
    />
  );
}
