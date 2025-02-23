import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import WorkoutSessionExerciseSetModal from "@/components/workoutSession/WorkoutSessionExerciseSetModal";

import { ModalMode } from "@/types/types";

type CreateWorkoutSessionExerciseSetModalProps = {
  workoutSessionId?: number;
  workoutSessionExerciseId?: number;
};

export default function CreateWorkoutSessionExerciseSetModal({
  workoutSessionId,
  workoutSessionExerciseId,
}: CreateWorkoutSessionExerciseSetModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="ml-auto">
        <Button
          onPress={onOpen}
          color="primary"
          variant="flat"
          endContent={<FontAwesomeIcon icon={faPlus} />}
        >
          Přidat sérii
        </Button>
      </div>
      <WorkoutSessionExerciseSetModal
        isOpen={isOpen}
        onClose={onClose}
        mode={ModalMode.Create}
        workoutSessionId={workoutSessionId}
        workoutSessionExerciseId={workoutSessionExerciseId}
      />
    </>
  );
}
