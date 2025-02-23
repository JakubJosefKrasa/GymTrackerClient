import { Key, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import CreateTrainingPlanModal from "@/components/trainingPlans/CreateTrainingPlanModal";
import EditTrainingPlanModal from "@/components/trainingPlans/EditTrainingPlanModal";
import DeleteTrainingPlanModal from "@/components/trainingPlans/DeleteTrainingPlanModal";

import { TrainingPlanType } from "@/types/types";

import { useGetTrainingPlans } from "@/api/trainingPlansHttp";

export default function TrainingPlansTable() {
  const [pageNumber, setPageNumber] = useState(0);

  const [trainingPlanToDelete, setTrainingPlanToDelete] =
    useState<TrainingPlanType | null>(null);
  const [trainingPlanToEdit, setTrainingPlanToEdit] =
    useState<TrainingPlanType | null>(null);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetTrainingPlans(pageNumber, 5);

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

  function handleOpenModalEdit(trainingPlan: TrainingPlanType) {
    setTrainingPlanToEdit(trainingPlan);
    onOpenEdit();
  }

  function handleOpenModalDeletion(trainingPlan: TrainingPlanType) {
    setTrainingPlanToDelete(trainingPlan);
    onOpenDeletion();
  }

  function DropDownContent({
    trainingPlan,
  }: {
    trainingPlan: TrainingPlanType;
  }) {
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
              onPress={() => handleOpenModalEdit(trainingPlan)}
              key="edit"
            >
              Upravit
            </DropdownItem>
            <DropdownItem
              onPress={() => handleOpenModalDeletion(trainingPlan)}
              key="delete"
            >
              Smazat
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

  const renderCell = useCallback(
    (trainingPlan: TrainingPlanType, columnKey: Key) => {
      switch (columnKey) {
        case "actions":
          return <DropDownContent trainingPlan={trainingPlan} />;
        default:
          return trainingPlan.trainingPlanName;
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
        ariaLabel="Seznam tréninkových plánů"
        columns={[
          { label: "Tréninkový plán", key: "trainingPlan" },
          { label: "Akce", key: "actions" },
        ]}
        data={data?.items}
        emptyTableMessage="Ještě nemáte žádné tréninkové plány"
        renderCell={renderCell}
        topContent={<CreateTrainingPlanModal />}
        isLoading={isLoading}
        isError={isError}
        errorMessage="Tréninkové plány se nepodařilo načíst"
        totalItems={data?.totalItems}
        onPageChange={setPageNumber}
        showPagination={true}
        isRowClickable={true}
        onRowClick={handleRowClick}
      />

      <EditTrainingPlanModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        trainingPlan={trainingPlanToEdit}
      />
      <DeleteTrainingPlanModal
        isOpen={isOpenDeletion}
        onClose={onCloseDeletion}
        trainingPlan={trainingPlanToDelete}
      />
    </>
  );
}
