import { Key, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import CreateWorkoutSessionModal from "@/components/workoutSessions/CreateWorkoutSessionModal";
import DeleteWorkoutSessionModal from "@/components/workoutSessions/DeleteWorkoutSessionModal";

import { WorkoutSessionType } from "@/types/types";

import { useGetWorkoutSessionsQuery } from "@/api/workoutSessionsHttp";

import { convertDateFormat } from "@/utils/convertDateFormat";

export default function WorkoutSessionsTable() {
  const [workoutSessionToDelete, setWorkoutSessionToDelete] =
    useState<WorkoutSessionType | null>(null);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetWorkoutSessionsQuery();

  const {
    isOpen: isOpenDeletion,
    onOpen: onOpenDeletion,
    onClose: onCloseDeletion,
  } = useDisclosure();

  function handleOpenModalDeletion(workoutSession: WorkoutSessionType) {
    setWorkoutSessionToDelete(workoutSession);
    onOpenDeletion();
  }

  function DropDownContent({
    workoutSession,
  }: {
    workoutSession: WorkoutSessionType;
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
                onPress={() => handleOpenModalDeletion(workoutSession)}
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
    (workoutSession: WorkoutSessionType, columnKey: Key) => {
      switch (columnKey) {
        case "date":
          return convertDateFormat(workoutSession.date);
        case "actions":
          return <DropDownContent workoutSession={workoutSession} />;
        default:
          return workoutSession.trainingPlan.trainingPlanName;
      }
    },
    []
  );

  function handleRowClick(id: number | undefined) {
    if (id) {
      navigate(`${id}`);
    }
  }

  return (
    <>
      <DataTable
        ariaLabel="Seznam tréninků"
        columns={[
          { label: "Tréninkový plán", key: "trainingPlan" },
          { label: "Datum", key: "date" },
          { label: "Akce", key: "actions" },
        ]}
        data={data}
        emptyTableMessage="Ještě nemáte žádné tréninkové plány"
        renderCell={renderCell}
        topContent={<CreateWorkoutSessionModal />}
        isLoading={isLoading}
        isError={isError}
        errorMessage="Tréninky se nepodařilo načíst"
        totalItems={data?.length}
        showPagination={false}
        isRowClickable={true}
        onRowClick={handleRowClick}
      />

      <DeleteWorkoutSessionModal
        isOpen={isOpenDeletion}
        onClose={onCloseDeletion}
        workoutSession={workoutSessionToDelete}
      />
    </>
  );
}
