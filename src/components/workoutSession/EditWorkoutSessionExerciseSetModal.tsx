import { UseDisclosureProps } from "@heroui/modal";

import WorkoutSessionExerciseSetModal from "@/components/workoutSession/WorkoutSessionExerciseSetModal";

import { ModalMode } from "@/types/types";

type EditWorkoutSessionExerciseSetModalProps = UseDisclosureProps & {
  workoutSessionId?: number;
  workoutSessionExerciseId?: number;
  workoutSessionExerciseSetId?: number | null;
};

export default function EditWorkoutSessionExerciseSetModal({
  isOpen,
  onClose,
  workoutSessionId,
  workoutSessionExerciseId,
  workoutSessionExerciseSetId,
}: EditWorkoutSessionExerciseSetModalProps) {
  return (
    <WorkoutSessionExerciseSetModal
      isOpen={isOpen}
      onClose={onClose}
      mode={ModalMode.Edit}
      workoutSessionId={workoutSessionId}
      workoutSessionExerciseId={workoutSessionExerciseId}
      workoutSessionExerciseSetId={workoutSessionExerciseSetId}
    />
  );
}
