import { Key, useCallback, useState } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Accordion, AccordionItem } from "@heroui/accordion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import CreateWorkoutSessionExerciseSetModal from "@/components/workoutSession/CreateWorkoutSessionExerciseSetModal";
import EditWorkoutSessionExerciseSetModal from "@/components/workoutSession/EditWorkoutSessionExerciseSetModal";
import DeleteWorkoutSessionExerciseSetModal from "@/components/workoutSession/DeleteWorkoutSessionExerciseSetModal";

import { ExerciseSetType, WorkoutSessionExercisesType } from "@/types/types";
import { subtitle } from "../primitives";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";

type WorkoutSessionTableProps = {
  workoutSession: WorkoutSessionExercisesType;
};

type WorkoutSessionExerciseSetIdsType = {
  workoutSessionExerciseId: number;
  workoutSessionExerciseSetId: number;
};

type WorkoutSessionExerciseSetToDeleteType = WorkoutSessionExerciseSetIdsType;

type WorkoutSessionExerciseSetToEditType = WorkoutSessionExerciseSetIdsType;

export default function WorkoutSessionTable({
  workoutSession,
}: WorkoutSessionTableProps) {
  console.log("workoutSession: ", workoutSession);
  const [workoutSessionExerciseSetToEdit, setWorkoutSessionExerciseSetToEdit] =
    useState<WorkoutSessionExerciseSetToEditType | null>(null);

  const [
    workoutSessionExerciseSetToDelete,
    setWorkoutSessionExerciseSetToDelete,
  ] = useState<WorkoutSessionExerciseSetToDeleteType | null>(null);

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenDeletion,
    onOpen: onOpenDeletion,
    onClose: onCloseDeletion,
  } = useDisclosure();

  function DropDownContent({
    workoutSessionExerciseSet,
  }: {
    workoutSessionExerciseSet: WorkoutSessionExerciseSetToEditType;
  }) {
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
                onPress={() => {
                  setWorkoutSessionExerciseSetToEdit(workoutSessionExerciseSet);
                  onOpenEdit();
                }}
                key="edit"
              >
                Upravit
              </DropdownItem>
              <DropdownItem
                onPress={() => {
                  setWorkoutSessionExerciseSetToDelete(
                    workoutSessionExerciseSet
                  );
                  onOpenDeletion();
                }}
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

  const renderCell = useCallback(
    (
      workoutSessionExerciseId: number,
      exerciseSet: ExerciseSetType,
      columnKey: Key
    ) => {
      switch (columnKey) {
        case "actions":
          return (
            <DropDownContent
              workoutSessionExerciseSet={{
                workoutSessionExerciseId: workoutSessionExerciseId,
                workoutSessionExerciseSetId: exerciseSet.id,
              }}
            />
          );
        case "weight":
          return exerciseSet.weight + " kg";
        case "repetitions":
          return exerciseSet.repetitions + " x";
      }
    },
    []
  );

  if (workoutSession.trainingPlan.workoutSessionExercises.length < 1)
    return (
      <h2 className={`mt-6 ${subtitle()}`}>
        V tréninkovém plánu nejsou žádné cviky
      </h2>
    );

  return (
    <>
      <Accordion variant="shadow" className="mt-20 max-w-xl">
        {workoutSession.trainingPlan.workoutSessionExercises.map(
          (workoutSessionExercise) => (
            <AccordionItem
              key={workoutSessionExercise.id}
              aria-label={workoutSessionExercise.exercise.exerciseName}
              title={workoutSessionExercise.exercise.exerciseName}
            >
              <>
                <Table
                  aria-label="Trénink"
                  removeWrapper
                  classNames={{
                    wrapper: "max-h-[382px] max-w-lg",
                  }}
                >
                  <TableHeader
                    columns={[
                      { label: "Váha", key: "weight" },
                      { label: "Opakování", key: "repetitions" },
                      { label: "Akce", key: "actions" },
                    ]}
                  >
                    {(column) => (
                      <TableColumn
                        key={column.key}
                        align={column.key === "actions" ? "end" : "start"}
                      >
                        {column.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    emptyContent="Nemáte žádné série"
                    items={workoutSessionExercise.exercise.sets || []}
                  >
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(
                              workoutSessionExercise.id,
                              item,
                              columnKey
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="flex ml-auto mt-4">
                  <CreateWorkoutSessionExerciseSetModal
                    workoutSessionId={workoutSession?.id}
                    workoutSessionExerciseId={workoutSessionExercise.id}
                  />
                </div>
              </>
            </AccordionItem>
          )
        )}
      </Accordion>

      <EditWorkoutSessionExerciseSetModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        workoutSessionId={workoutSession?.id}
        workoutSessionExerciseId={
          workoutSessionExerciseSetToEdit?.workoutSessionExerciseId
        }
        workoutSessionExerciseSetId={
          workoutSessionExerciseSetToEdit?.workoutSessionExerciseSetId
        }
      />

      <DeleteWorkoutSessionExerciseSetModal
        isOpen={isOpenDeletion}
        onClose={onCloseDeletion}
        workoutSessionId={workoutSession?.id}
        workoutSessionExerciseId={
          workoutSessionExerciseSetToDelete?.workoutSessionExerciseId
        }
        workoutSessionExerciseSetId={
          workoutSessionExerciseSetToDelete?.workoutSessionExerciseSetId
        }
      />
    </>
  );
}
