import { UseDisclosureProps } from "@heroui/modal";

import WorkoutSessionExerciseSetModal from "@/components/workoutSession/WorkoutSessionExerciseSetModal";

import { ModalMode } from "@/types/types";

type EditWorkoutSessionExerciseSetModalProps = UseDisclosureProps & {
  workoutSessionId?: number;
  workoutSessionExerciseId?: number;
  workoutSessionExerciseSetId?: number | null;
  currentWeight?: number;
  currentRepetitions?: number;
};

export default function EditWorkoutSessionExerciseSetModal({
  isOpen,
  onClose,
  workoutSessionId,
  workoutSessionExerciseId,
  workoutSessionExerciseSetId,
  currentWeight,
  currentRepetitions,
}: EditWorkoutSessionExerciseSetModalProps) {
  return (
    <WorkoutSessionExerciseSetModal
      isOpen={isOpen}
      onClose={onClose}
      mode={ModalMode.Edit}
      workoutSessionId={workoutSessionId}
      workoutSessionExerciseId={workoutSessionExerciseId}
      workoutSessionExerciseSetId={workoutSessionExerciseSetId}
      currentWeight={currentWeight}
      currentRepetitions={currentRepetitions}
    />
  );
}
