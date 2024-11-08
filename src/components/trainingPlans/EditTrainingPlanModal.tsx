import { UseDisclosureProps } from "@nextui-org/modal";

import TrainingPlanNameModal from "@/components/trainingPlans/TrainingPlanNameModal";

import { ModalMode, TrainingPlanType } from "@/types/types";

type EditTrainingPlanModalProps = UseDisclosureProps & {
  trainingPlan: TrainingPlanType | null;
};

export default function EditTrainingPlanModal({
  isOpen,
  onClose,
  trainingPlan,
}: EditTrainingPlanModalProps) {
  return (
    <TrainingPlanNameModal
      isOpen={isOpen}
      onClose={onClose}
      trainingPlan={trainingPlan}
      mode={ModalMode.Edit}
    />
  );
}
