import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import TrainingPlanNameModal from "@/components/trainingPlans/TrainingPlanNameModal";

import { ModalMode } from "@/types/types";

export default function CreateTrainingPlanModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="ml-auto">
        <Button
          onPress={onOpen}
          color="primary"
          endContent={<FontAwesomeIcon icon={faPlus} />}
        >
          Vytvořit plán
        </Button>
      </div>
      <TrainingPlanNameModal
        isOpen={isOpen}
        onClose={onClose}
        trainingPlan={null}
        mode={ModalMode.Create}
      />
    </>
  );
}
