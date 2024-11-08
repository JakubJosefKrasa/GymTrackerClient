import { Key, useCallback, useState } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import DataTable from "@/components/reusable/DataTable";
import AddExerciseInTrainingPlanModal from "@/components/trainingPlan/AddExerciseInTrainingPlanModal";
import RemoveExerciseFromTrainingPlanModal from "@/components/trainingPlan/RemoveExerciseFromTrainingPlanModal";

import { ExerciseType, TrainingPlanType } from "@/types/types";

type TrainingPlanTableProps = {
  trainingPlan: TrainingPlanType;
  isError: boolean;
};

export default function TrainingPlanTable({
  trainingPlan,
  isError,
}: TrainingPlanTableProps) {
  const [exerciseToDelete, setExerciseToDelete] = useState<ExerciseType | null>(
    null
  );

  const {
    isOpen: isOpenDeletion,
    onOpen: onOpenDeletion,
    onClose: onCloseDeletion,
  } = useDisclosure();

  function handleOpenModalDeletion(exercise: ExerciseType) {
    setExerciseToDelete(exercise);
    onOpenDeletion();
  }

  function DropDownContent({ exercise }: { exercise: ExerciseType }) {
    return (
      <>
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="text-default-300"
                  size="xl"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onPress={() => handleOpenModalDeletion(exercise)}>
                Smazat
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </>
    );
  }

  const renderCell = useCallback((exercise: ExerciseType, columnKey: Key) => {
    switch (columnKey) {
      case "actions":
        return <DropDownContent exercise={exercise} />;
      default:
        return exercise.exerciseName;
    }
  }, []);

  return (
    <>
      <DataTable
        ariaLabel="Seznam cviků"
        columns={[
          { label: "Cvik", key: "exercise" },
          { label: "Akce", key: "actions" },
        ]}
        data={trainingPlan.exercises}
        emptyTableMessage="Ještě nemáte žádné cviky v tréninkovém plánu"
        renderCell={renderCell}
        topContent={
          <AddExerciseInTrainingPlanModal trainingPlanId={trainingPlan.id} />
        }
        isLoading={false}
        isError={isError}
        errorMessage="Tréninkový plán se nepodařilo načíst"
        totalItems={trainingPlan.exercises.length}
        showPagination={false}
        isRowClickable={false}
      />

      <RemoveExerciseFromTrainingPlanModal
        isOpen={isOpenDeletion}
        onClose={onCloseDeletion}
        exercise={exerciseToDelete}
        trainingPlanId={trainingPlan.id}
      />
    </>
  );
}
