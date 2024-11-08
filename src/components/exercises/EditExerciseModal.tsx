import { UseDisclosureProps } from "@nextui-org/modal";

import ExerciseNameModal from "@/components/exercises/ExerciseNameModal";

import { ExerciseType, ModalMode } from "@/types/types";

type EditExerciseModalProps = UseDisclosureProps & {
  exercise: ExerciseType | null;
};

export default function EditExerciseModal({
  isOpen,
  onClose,
  exercise,
}: EditExerciseModalProps) {
  return (
    <ExerciseNameModal
      isOpen={isOpen}
      onClose={onClose}
      exercise={exercise}
      mode={ModalMode.Edit}
    />
  );
}
