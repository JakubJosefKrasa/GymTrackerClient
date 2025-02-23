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
import CreateExerciseModal from "@/components/exercises/CreateExerciseModal";
import EditExerciseModal from "@/components/exercises/EditExerciseModal";
import DeleteExerciseModal from "@/components/exercises/DeleteExerciseModal";

import { ExerciseType } from "@/types/types";

import { useGetExercises } from "@/api/exercisesHttp";

export default function ExercisesTable() {
  const [pageNumber, setPageNumber] = useState(0);

  const [exerciseToDelete, setExerciseToDelete] = useState<ExerciseType | null>(
    null
  );
  const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseType | null>(
    null
  );

  const { data, isLoading, isError } = useGetExercises(pageNumber, 5);

  const {
    isOpen: isOpenDeletion,
    onOpen: onOpenDeletion,
    onClose: onCloseDeletion,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  function handleOpenModalEdit(exercise: ExerciseType) {
    setExerciseToEdit(exercise);
    onOpenEdit();
  }

  function handleOpenModalDeletion(exercise: ExerciseType) {
    setExerciseToDelete(exercise);
    onOpenDeletion();
  }

  function DropDownContent({ exercise }: { exercise: ExerciseType }) {
    return (
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
              onPress={() => handleOpenModalEdit(exercise)}
              key="edit"
            >
              Upravit
            </DropdownItem>
            <DropdownItem
              onPress={() => handleOpenModalDeletion(exercise)}
              key="delete"
            >
              Smazat
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
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
        data={data?.items}
        emptyTableMessage="Ještě nemáte žádné cviky"
        renderCell={renderCell}
        topContent={<CreateExerciseModal />}
        isLoading={isLoading}
        isError={isError}
        errorMessage="Cviky se nepodařilo načíst"
        totalItems={data?.totalItems}
        onPageChange={setPageNumber}
        showPagination={true}
        isRowClickable={false}
      />

      <EditExerciseModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        exercise={exerciseToEdit}
      />
      <DeleteExerciseModal
        isOpen={isOpenDeletion}
        onClose={onCloseDeletion}
        exercise={exerciseToDelete}
      />
    </>
  );
}
