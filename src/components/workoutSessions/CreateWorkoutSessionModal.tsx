import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "@internationalized/date";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";
import { Alert } from "@heroui/alert";

import {
  workoutSessionFormSchema,
  WorkoutSessionFormSchemaType,
} from "@/types/schemas";

import { useGetTrainingPlans } from "@/api/trainingPlansHttp";
import { useCreateWorkoutSessionMutation } from "@/api/workoutSessionsHttp";

export default function CreateWorkoutSessionModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: trainingPlans,
    isLoading: isLoadingTrainingPlans,
    isError: isErrorTrainingPlans,
  } = useGetTrainingPlans(-1, -1);
  const {
    mutate: createWorkoutSession,
    isPending: isPendingCreateWorkoutSessions,
  } = useCreateWorkoutSessionMutation();

  const form = useForm<WorkoutSessionFormSchemaType>({
    resolver: zodResolver(workoutSessionFormSchema),
    mode: "onTouched",
    defaultValues: {
      trainingPlan: "",
      date: new Date(),
    },
  });

  async function onSubmit(data: WorkoutSessionFormSchemaType) {
    createWorkoutSession({
      date: data.date,
      trainingPlanId: Number(data.trainingPlan),
    });
    form.reset();
    onClose?.();
  }

  if (isLoadingTrainingPlans) {
    return <Spinner />;
  }

  if (isErrorTrainingPlans) {
    return (
      <div className="flex justify-center">
        <Alert
          color="danger"
          title="Tréninkové plány které je možné přidat se nepodařilo načíst"
        />
      </div>
    );
  }

  return (
    <>
      <div className="ml-auto">
        <Button
          onPress={onOpen}
          color="primary"
          endContent={<FontAwesomeIcon icon={faPlus} />}
        >
          Vytvořit trénink
        </Button>
      </div>
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
                Vytvořit nový trénink
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <Controller
                    name="trainingPlan"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        variant="bordered"
                        items={trainingPlans?.items}
                        isRequired
                        label="Zvolte tréninkový plán"
                        isInvalid={form.getFieldState("trainingPlan").invalid}
                        errorMessage={
                          form.formState.errors.trainingPlan?.message
                        }
                        {...field}
                      >
                        {(trainingPlan) => (
                          <SelectItem key={trainingPlan.id}>
                            {trainingPlan.trainingPlanName}
                          </SelectItem>
                        )}
                      </Select>
                    )}
                  />

                  <Controller
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker
                        variant="bordered"
                        label="Datum"
                        isRequired
                        value={
                          field.value
                            ? parseDate(field.value.toISOString().split("T")[0])
                            : null
                        }
                        onChange={(date) =>
                          field.onChange(
                            date ? new Date(date.toString()) : null
                          )
                        }
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
                      isDisabled={
                        !form.formState.isValid ||
                        isPendingCreateWorkoutSessions
                      }
                      isLoading={isPendingCreateWorkoutSessions}
                    >
                      Přidat
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
