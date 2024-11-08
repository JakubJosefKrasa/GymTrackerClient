import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ExerciseNameModal from "@/components/exercises/ExerciseNameModal";

import { ModalMode } from "@/types/types";

export default function CreateExerciseModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="ml-auto">
        <Button
          onPress={onOpen}
          color="primary"
          endContent={<FontAwesomeIcon icon={faPlus} />}
        >
          Vytvořit cvik
        </Button>
      </div>
      <ExerciseNameModal
        isOpen={isOpen}
        onClose={onClose}
        exercise={null}
        mode={ModalMode.Create}
      />
    </>
  );
}
