import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  UseDisclosureProps,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import {
  trainingPlanFormScheme,
  TrainingPlanSchemaType,
} from "@/types/schemas";
import { ModalMode, TrainingPlanType } from "@/types/types";

import {
  useCreateTrainingPlanMutation,
  useEditTrainingPlanMutation,
} from "@/api/trainingPlansHttp";

type TrainingPlanNameModalProps = UseDisclosureProps & {
  trainingPlan: TrainingPlanType | null;
  mode: ModalMode;
};

export default function TrainingPlanNameModal({
  isOpen,
  onClose,
  trainingPlan,
  mode,
}: TrainingPlanNameModalProps) {
  const { mutate: editTrainingPlan, isPending: isPendingEditTrainingPlan } =
    useEditTrainingPlanMutation();
  const { mutate: createTrainingPlan, isPending: isPendingCreateTrainingPlan } =
    useCreateTrainingPlanMutation();

  const form = useForm<TrainingPlanSchemaType>({
    resolver: zodResolver(trainingPlanFormScheme),
    mode: "onTouched",
    defaultValues: {
      trainingPlanName: "",
    },
  });

  async function onSubmit(data: TrainingPlanSchemaType) {
    if (mode === ModalMode.Edit && trainingPlan !== null) {
      editTrainingPlan({
        trainingPlan,
        trainingPlanName: data.trainingPlanName,
      });
    } else {
      createTrainingPlan(data);
    }
    form.reset();
    onClose?.();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {mode === ModalMode.Edit
                  ? "Přejmenovat tréninkový plán"
                  : "Vytvořit nový tréninkový plán"}
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <Controller
                    name="trainingPlanName"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        label="Tréninkový plán"
                        placeholder="Zadejte tréninkový plán"
                        variant="bordered"
                        isInvalid={
                          form.getFieldState("trainingPlanName").invalid
                        }
                        errorMessage={
                          form.formState.errors.trainingPlanName?.message
                        }
                        {...field}
                      />
                    )}
                  />
                  <div className="flex flex-col-reverse lg:flex-row gap-2 py-4 justify-end">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Zrušit
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      isLoading={
                        mode === ModalMode.Edit
                          ? isPendingEditTrainingPlan
                          : isPendingCreateTrainingPlan
                      }
                      isDisabled={
                        !form.formState.isValid ||
                        (mode === ModalMode.Edit
                          ? isPendingEditTrainingPlan
                          : isPendingCreateTrainingPlan)
                      }
                    >
                      {mode === ModalMode.Edit ? "Změnit" : "Vytvořit"}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
