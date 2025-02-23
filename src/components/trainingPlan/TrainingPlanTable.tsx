import { Key, useCallback, useState } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import DataTable from "@/components/reusable/DataTable";
import AddExerciseInTrainingPlanModal from "@/components/trainingPlan/AddExerciseInTrainingPlanModal";
import RemoveExerciseFromTrainingPlanModal from "@/components/trainingPlan/RemoveExerciseFromTrainingPlanModal";

import { ExerciseType, TrainingPlanExercisesType } from "@/types/types";

type TrainingPlanTableProps = {
  trainingPlanExercises: TrainingPlanExercisesType;
  isError: boolean;
};

export default function TrainingPlanTable({
  trainingPlanExercises,
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
              <DropdownItem
                onPress={() => handleOpenModalDeletion(exercise)}
                key="delete"
              >
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
        data={trainingPlanExercises.exercises}
        emptyTableMessage="Ještě nemáte žádné cviky v tréninkovém plánu"
        renderCell={renderCell}
        topContent={
          <AddExerciseInTrainingPlanModal
            trainingPlanId={trainingPlanExercises.id}
          />
        }
        isLoading={false}
        isError={isError}
        errorMessage="Tréninkový plán se nepodařilo načíst"
        totalItems={trainingPlanExercises.exercises.length}
        showPagination={false}
        isRowClickable={false}
      />

      <RemoveExerciseFromTrainingPlanModal
        isOpen={isOpenDeletion}
        onClose={onCloseDeletion}
        exercise={exerciseToDelete}
        trainingPlanId={trainingPlanExercises.id}
      />
    </>
  );
}
