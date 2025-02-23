import { UseDisclosureProps } from "@heroui/modal";

import DeleteItemModal from "@/components/reusable/DeleteItemModal";

import { useDeleteExerciseSetMutation } from "@/api/workoutSessionsHttp";

type DeleteWorkoutSessionExerciseSetModalProps = UseDisclosureProps & {
  workoutSessionId?: number;
  workoutSessionExerciseId?: number;
  workoutSessionExerciseSetId?: number | null;
};

export default function DeleteWorkoutSessionExerciseSetModal({
  isOpen,
  onClose,
  workoutSessionId,
  workoutSessionExerciseId,
  workoutSessionExerciseSetId,
}: DeleteWorkoutSessionExerciseSetModalProps) {
  const { mutate: deleteSet, isPending } = useDeleteExerciseSetMutation();

  async function handleSetDeletion() {
    if (
      workoutSessionId &&
      workoutSessionExerciseId &&
      workoutSessionExerciseSetId &&
      onClose !== undefined
    ) {
      deleteSet({
        workoutSessionId,
        workoutSessionExerciseId,
        workoutSessionExerciseSetId,
      });
      onClose();
    }
  }

  return (
    <DeleteItemModal
      isOpen={isOpen}
      onClose={onClose}
      headerText={`Opravdu si přejete smazat sérii?`}
      bodyText="Akce se nedá odvolat a série bude smazána"
      confirmButtonText="Smazat"
      onDeleteItem={handleSetDeletion}
      isLoading={isPending}
    />
  );
}
