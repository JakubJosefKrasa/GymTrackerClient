import { UseDisclosureProps } from "@nextui-org/modal";

import DeleteItemModal from "@/components/reusable/DeleteItemModal";

import { TrainingPlanType } from "@/types/types";

import { useDeleteTrainingPlanMutation } from "@/api/trainingPlansHttp";

type DeleteTrainingPlanModalProps = UseDisclosureProps & {
  trainingPlan: TrainingPlanType | null;
};

export default function DeleteTrainingPlanModal({
  isOpen,
  onClose,
  trainingPlan,
}: DeleteTrainingPlanModalProps) {
  const { mutate: deleteTrainingPlan, isPending } =
    useDeleteTrainingPlanMutation();

  async function handleTrainingPlanDeletion() {
    if (trainingPlan !== null && onClose !== undefined) {
      deleteTrainingPlan(trainingPlan);
      onClose();
    }
  }

  return (
    <DeleteItemModal
      isOpen={isOpen}
      onClose={onClose}
      headerText={`Opravdu si přejete smazat tréninkový plán ${trainingPlan?.trainingPlanName}?`}
      bodyText="Akce se nedá odvolat a tréninkový plán bude smazán"
      confirmButtonText="Smazat"
      onDeleteItem={handleTrainingPlanDeletion}
      isLoading={isPending}
    />
  );
}
