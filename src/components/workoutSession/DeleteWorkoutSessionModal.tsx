import { UseDisclosureProps } from "@heroui/modal";

import DeleteItemModal from "@/components/reusable/DeleteItemModal";

import { WorkoutSessionType } from "@/types/types";

import { useDeleteWorkoutSessionMutation } from "@/api/workoutSessionsHttp";

type DeleteWorkoutSessionModalProps = UseDisclosureProps & {
  workoutSession: WorkoutSessionType | null;
};

export default function DeleteWorkoutSessionModal({
  isOpen,
  onClose,
  workoutSession,
}: DeleteWorkoutSessionModalProps) {
  const { mutate: deleteWorkoutSession, isPending } =
    useDeleteWorkoutSessionMutation();

  async function handleWorkoutSessionDeletion() {
    if (workoutSession !== null && onClose !== undefined) {
      deleteWorkoutSession(workoutSession.id);
      onClose();
    }
  }

  return (
    <DeleteItemModal
      isOpen={isOpen}
      onClose={onClose}
      headerText={`Opravdu si přejete smazat trénink?`}
      bodyText="Akce se nedá odvolat a trénink bude smazán"
      confirmButtonText="Smazat"
      onDeleteItem={handleWorkoutSessionDeletion}
      isLoading={isPending}
    />
  );
}
